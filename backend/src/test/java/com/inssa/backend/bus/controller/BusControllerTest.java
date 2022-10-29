package com.inssa.backend.bus.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.bus.controller.dto.BusLikeResponse;
import com.inssa.backend.bus.service.BusService;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BusController.class)
public class BusControllerTest extends ApiDocument {

    private static final Long ID = 1L;
    private static final int BUS_NUMBER = 1;
    private static final String PREVIOUS_BUS_STOP = "수통골";
    private static final String NEXT_BUS_STOP = "한밭대";

    @MockBean
    private BusService busService;

    private List<BusLikeResponse> busLikeResponses;

    @BeforeEach
    void setUp() {
        BusLikeResponse bulLikeResponse = BusLikeResponse.builder()
                .number(BUS_NUMBER)
                .previousBusStop(PREVIOUS_BUS_STOP)
                .nextBusStop(NEXT_BUS_STOP)
                .build();
        busLikeResponses = IntStream.range(0, 2)
                .mapToObj(n -> bulLikeResponse)
                .collect(Collectors.toList());
    }

    @DisplayName("버스 즐겨찾기 목록 조회 성공")
    @Test
    void get_like_bus_success() throws Exception {
        // given
        willReturn(busLikeResponses).given(busService).getBusLikes(anyLong());
        // when
        ResultActions resultActions = 버스_즐겨찾기_목록_조회_요청(ID);
        // then
        버스_즐겨찾기_목록_조회_성공(resultActions);
    }

    @DisplayName("버스 즐겨찾기 목록 조회 실패")
    @Test
    void get_like_bus_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).getBusLikes(anyLong());
        // when
        ResultActions resultActions = 버스_즐겨찾기_목록_조회_요청(ID);
        // then
        버스_즐겨찾기_목록_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
    }

    private ResultActions 버스_즐겨찾기_목록_조회_요청(Long memberId) throws Exception {
        return mockMvc.perform(get("/api/v1/buses/likes/" + memberId)
                .contextPath("/api/v1"));
    }

    private void 버스_즐겨찾기_목록_조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(busLikeResponses)))
                .andDo(print())
                .andDo(toDocument("get-bus-likes-success"));
    }

    private void 버스_즐겨찾기_목록_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-bus-likes-fail"));
    }
}
