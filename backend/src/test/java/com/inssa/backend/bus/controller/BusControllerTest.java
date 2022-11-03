package com.inssa.backend.bus.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.bus.controller.dto.BusLikeResponse;
import com.inssa.backend.bus.controller.dto.BusResponse;
import com.inssa.backend.bus.controller.dto.RouteImageResponse;
import com.inssa.backend.bus.controller.dto.RouteResponse;
import com.inssa.backend.bus.service.BusService;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.Role;
import com.inssa.backend.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BusController.class)
public class BusControllerTest extends ApiDocument {

    private static final int NUMBER = 1;
    private static final String NUMBER_PARAMETER_NAME = "number";
    private static final boolean IS_LAST = true;
    private static final String BUS_STOP_NAME = "삼성화재연수원";
    private static final int BUS_NUMBER = 1;
    private static final String PREVIOUS_BUS_STOP = "수통골";
    private static final String NEXT_BUS_STOP = "한밭대";
    private static final String URL = "https://j7b304.p.ssafy.io/api/image/1";
    private static final String NAME = "삼성화재유성연수원";
    private static final double LATITUDE = 36.355327727196915;
    private static final double LONGITUDE = 127.29848167977559;
    private static final Long ID = 1L;
    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, Role.GENERAL);

    @MockBean
    private BusService busService;

    private BusResponse busResponse;
    private List<BusLikeResponse> busLikeResponses;
    private RouteImageResponse routeImageResponse;
    private List<RouteResponse> routeResponses;

    @BeforeEach
    void setUp() {
        BusLikeResponse bulLikeResponse = BusLikeResponse.builder()
                .number(BUS_NUMBER)
                .previousBusStop(PREVIOUS_BUS_STOP)
                .nextBusStop(NEXT_BUS_STOP)
                .build();
        RouteResponse routeResponse = RouteResponse.builder()
                .routeId(ID)
                .name(NAME)
                .latitude(LATITUDE)
                .longitude(LONGITUDE)
                .build();
        busResponse = BusResponse.builder()
                .isLast(IS_LAST)
                .lastVisitedBusStop(BUS_STOP_NAME)
                .busStops(IntStream.range(0, 2)
                        .mapToObj(n -> BUS_STOP_NAME)
                        .collect(Collectors.toList()))
                .build();
        busLikeResponses = IntStream.range(0, 2)
                .mapToObj(n -> bulLikeResponse)
                .collect(Collectors.toList());
        routeImageResponse = RouteImageResponse.builder()
                .url(URL)
                .build();
        routeResponses = IntStream.range(0, 2)
                .mapToObj(n -> routeResponse)
                .collect(Collectors.toList());
    }

    @DisplayName("버스 조회 성공")
    @Test
    void get_bus_success() throws Exception {
        // given
        willReturn(busResponse).given(busService).getBus(anyInt());
        // when
        ResultActions resultActions = 버스_조회_요청(NUMBER);
        // then
        버스_조회_성공(resultActions);
    }

    @DisplayName("버스 조회 실패")
    @Test
    void get_bus_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).getBus(anyInt());
        // when
        ResultActions resultActions = 버스_조회_요청(NUMBER);
        // then
        버스_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
    }

    @DisplayName("버스 즐겨찾기 등록 성공")
    @Test
    void create_bus_like_success() throws Exception {
        // given
        willDoNothing().given(busService).createBusLike(anyLong(), anyInt());
        // when
        ResultActions resultActions = 버스_즐겨찾기_등록_요청(NUMBER);
        // then
        버스_즐겨찾기_등록_성공(resultActions);
    }

    @DisplayName("버스 즐겨찾기 등록 실패")
    @Test
    void create_bus_like_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).createBusLike(anyLong(), anyInt());
        // when
        ResultActions resultActions = 버스_즐겨찾기_등록_요청(NUMBER);
        // then
        버스_즐겨찾기_등록_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
    }

    @DisplayName("버스 즐겨찾기 삭제 성공")
    @Test
    void delete_bus_like_success() throws Exception {
        // given
        willDoNothing().given(busService).deleteBusLike(anyLong(), anyInt());
        // when
        ResultActions resultActions = 버스_즐겨찾기_삭제_요청(NUMBER);
        // then
        버스_즐겨찾기_삭제_성공(resultActions);
    }

    @DisplayName("버스 즐겨찾기 삭제 실패")
    @Test
    void delete_bus_like_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).deleteBusLike(anyLong(), anyInt());
        // when
        ResultActions resultActions = 버스_즐겨찾기_삭제_요청(NUMBER);
        // then
        버스_즐겨찾기_삭제_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
    }

    @DisplayName("버스 즐겨찾기 목록 조회 성공")
    @Test
    void get_like_bus_success() throws Exception {
        // given
        willReturn(busLikeResponses).given(busService).getBusLikes(anyLong());
        // when
        ResultActions resultActions = 버스_즐겨찾기_목록_조회_요청();
        // then
        버스_즐겨찾기_목록_조회_성공(resultActions);
    }

    @DisplayName("버스 즐겨찾기 목록 조회 실패")
    @Test
    void get_like_bus_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).getBusLikes(anyLong());
        // when
        ResultActions resultActions = 버스_즐겨찾기_목록_조회_요청();
        // then
        버스_즐겨찾기_목록_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
    }

    @DisplayName("버스 노선 이미지 조회 성공")
    @Test
    void get_route_image_success() throws Exception {
        // given
        willReturn(routeImageResponse).given(busService).getRouteImage(anyInt());
        // when
        ResultActions resultActions = 버스_노선_이미지_조회_요청(NUMBER);
        // then
        버스_노선_이미지_조회_성공(resultActions);
    }

    @DisplayName("버스 노선 이미지 조회 실패")
    @Test
    void get_route_image_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_ROUTE_IMAGE)).given(busService).getRouteImage(anyInt());
        // when
        ResultActions resultActions = 버스_노선_이미지_조회_요청(NUMBER);
        // then
        버스_노선_이미지_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_ROUTE_IMAGE));
    }

    @DisplayName("버스 운행 시작 성공")
    @Test
    void start_bus_service_success() throws Exception {
        // given
        willReturn(routeResponses).given(busService).startBus(anyInt());
        // when
        ResultActions resultActions = 버스_운행_시작_요청(NUMBER);
        // then
        버스_운행_시작_성공(resultActions);
    }

    @DisplayName("버스 운행 시작 실패")
    @Test
    void start_bus_service_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).startBus(anyInt());
        // when
        ResultActions resultActions = 버스_운행_시작_요청(NUMBER);
        // then
        버스_운행_시작_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
    }

    @DisplayName("버스 위치 최신화 성공")
    @Test
    void arrive_at_success() throws Exception {
        // given
        willDoNothing().given(busService).arriveAt(anyLong());
        // when
        ResultActions resultActions = 버스_위치_최신화_요청(ID);
        // then
        버스_위치_최신화_성공(resultActions);
    }

    @DisplayName("버스 위치 최신화 실패")
    @Test
    void arrive_at_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_ROUTE)).given(busService).arriveAt(anyLong());
        // when
        ResultActions resultActions = 버스_위치_최신화_요청(ID);
        // then
        버스_위치_최신화_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_ROUTE));
    }

    private ResultActions 버스_조회_요청(int number) throws Exception {
        return mockMvc.perform(get("/api/v1/buses")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .param(NUMBER_PARAMETER_NAME, String.valueOf(number)));
    }

    private void 버스_조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(busResponse)))
                .andDo(print())
                .andDo(toDocument("get-bus-success"));
    }

    private void 버스_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-bus-fail"));
    }

    private ResultActions 버스_즐겨찾기_등록_요청(int number) throws Exception {
        return mockMvc.perform(post("/api/v1/buses/like")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .param(NUMBER_PARAMETER_NAME, String.valueOf(number)));
    }

    private void 버스_즐겨찾기_등록_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-bus-like-success"));
    }

    private void 버스_즐겨찾기_등록_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-bus-like-fail"));
    }

    private ResultActions 버스_즐겨찾기_삭제_요청(int number) throws Exception {
        return mockMvc.perform(delete("/api/v1/buses/like")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .param(NUMBER_PARAMETER_NAME, String.valueOf(number)));
    }

    private void 버스_즐겨찾기_삭제_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("delete-bus-like-success"));
    }

    private void 버스_즐겨찾기_삭제_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("delete-bus-like-fail"));
    }

    private ResultActions 버스_즐겨찾기_목록_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1/buses/like")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
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

    private ResultActions 버스_노선_이미지_조회_요청(int number) throws Exception {
        return mockMvc.perform(get("/api/v1/buses/route/image")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .param(NUMBER_PARAMETER_NAME, String.valueOf(number)));
    }

    private void 버스_노선_이미지_조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(routeImageResponse)))
                .andDo(print())
                .andDo(toDocument("get-route-image-success"));
    }

    private void 버스_노선_이미지_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-route-image-fail"));
    }

    private ResultActions 버스_운행_시작_요청(int number) throws Exception {
        return mockMvc.perform(get("/api/v1/buses/start")
                .contextPath("/api/v1")
                .param(NUMBER_PARAMETER_NAME, String.valueOf(number)));
    }

    private void 버스_운행_시작_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(routeResponses)))
                .andDo(print())
                .andDo(toDocument("start-bus-success"));
    }

    private void 버스_운행_시작_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("start-bus-fail"));
    }

    private ResultActions 버스_위치_최신화_요청(Long routeId) throws Exception {
        return mockMvc.perform(post("/api/v1/buses/arrive/" + routeId)
                .contextPath("/api/v1"));
    }

    private void 버스_위치_최신화_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("arrive-at-bus-stop-success"));
    }

    private void 버스_위치_최신화_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("arrive-at-bus-stop-fail"));
    }
}
