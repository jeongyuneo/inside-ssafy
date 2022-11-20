package com.inssa.backend.bus.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.bus.controller.dto.*;
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
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import javax.servlet.http.Cookie;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private static final boolean HAS_BUS_LIKE = true;
    private static final int BUS_STOP_INDEX = 1;
    private static final String BUS_STOP_NAME = "삼성화재연수원";
    private static final int BUS_NUMBER = 1;
    private static final String PREVIOUS_BUS_STOP = "수통골";
    private static final String NEXT_BUS_STOP = "한밭대";
    private static final String URL = "https://inside-ssafy.com/images/image-file";
    private static final String NAME = "삼성화재유성연수원";
    private static final String ADDRESS = "대전광역시 유성구 덕명동 124";
    private static final Long ID = 1L;
    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, Role.GENERAL);
    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    @MockBean
    private BusService busService;

    private String refreshToken;
    private BusRequest busRequest;
    private BusResponse busResponse;
    private BusLikeResponse busLikeResponse;
    private RouteImageResponse routeImageResponse;
    private List<RouteResponse> routeResponses;

    @BeforeEach
    void setUp() {
        Map<String, String> memberInfo = new HashMap<>();
        memberInfo.put("id", "1L");
        memberInfo.put("role", "GENERAL");
        RouteResponse routeResponse = RouteResponse.builder()
                .routeId(ID)
                .name(NAME)
                .address(ADDRESS)
                .build();
        refreshToken = JwtUtil.generateToken(memberInfo);
        busRequest = BusRequest.builder()
                .number(NUMBER)
                .build();
        busResponse = BusResponse.builder()
                .isLast(IS_LAST)
                .hasBusLike(HAS_BUS_LIKE)
                .lastVisitedBusStop(BUS_STOP_INDEX)
                .busStops(IntStream.range(0, 2)
                        .mapToObj(n -> BUS_STOP_NAME)
                        .collect(Collectors.toList()))
                .build();
        busLikeResponse = BusLikeResponse.builder()
                .previousBusStop(PREVIOUS_BUS_STOP)
                .nextBusStop(NEXT_BUS_STOP)
                .build();
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
        willReturn(busResponse).given(busService).getBus(anyLong(), anyInt());
        // when
        ResultActions resultActions = 버스_조회_요청(NUMBER);
        // then
        버스_조회_성공(resultActions);
    }

    @DisplayName("버스 조회 실패")
    @Test
    void get_bus_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).getBus(anyLong(), anyInt());
        // when
        ResultActions resultActions = 버스_조회_요청(NUMBER);
        // then
        버스_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
    }

    @DisplayName("버스 즐겨찾기 등록 성공")
    @Test
    void create_bus_like_success() throws Exception {
        // given
        willDoNothing().given(busService).createBusLike(anyLong(), any(BusRequest.class));
        // when
        ResultActions resultActions = 버스_즐겨찾기_등록_요청(NUMBER);
        // then
        버스_즐겨찾기_등록_성공(resultActions);
    }

    @DisplayName("버스 즐겨찾기 등록 실패")
    @Test
    void create_bus_like_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).createBusLike(anyLong(), any(BusRequest.class));
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

    @DisplayName("버스 즐겨찾기 조회 성공")
    @Test
    void get_like_bus_success() throws Exception {
        // given
        willReturn(busLikeResponse).given(busService).getBusLike(anyInt());
        // when
        ResultActions resultActions = 버스_즐겨찾기_조회_요청(BUS_NUMBER);
        // then
        버스_즐겨찾기_조회_성공(resultActions);
    }

    @DisplayName("버스 즐겨찾기 조회 실패")
    @Test
    void get_like_bus_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).getBusLike(anyInt());
        // when
        ResultActions resultActions = 버스_즐겨찾기_조회_요청(BUS_NUMBER);
        // then
        버스_즐겨찾기_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
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
    void start_bus_success() throws Exception {
        // given
        willReturn(routeResponses).given(busService).startBus(anyInt());
        // when
        ResultActions resultActions = 버스_운행_시작_요청(NUMBER);
        // then
        버스_운행_시작_성공(resultActions);
    }

    @DisplayName("버스 운행 시작 실패")
    @Test
    void start_bus_fail() throws Exception {
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

    @DisplayName("버스 운행 종료 성공")
    @Test
    void end_bus_success() throws Exception {
        // given
        willDoNothing().given(busService).endBus(any(BusRequest.class));
        // when
        ResultActions resultActions = 버스_운행_종료_요청(busRequest);
        // then
        버스_운행_종료_성공(resultActions);
    }

    @DisplayName("버스 운행 종료 실패")
    @Test
    void end_bus_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_BUS)).given(busService).endBus(any(BusRequest.class));
        // when
        ResultActions resultActions = 버스_운행_종료_요청(busRequest);
        // then
        버스_운행_종료_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_BUS));
    }

    private ResultActions 버스_조회_요청(int number) throws Exception {
        return mockMvc.perform(get("/api/v1/buses")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .cookie(new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken))
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
                .cookie(new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken))
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(busRequest)));
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
                .cookie(new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken))
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

    private ResultActions 버스_즐겨찾기_조회_요청(int number) throws Exception {
        return mockMvc.perform(get("/api/v1/buses/like")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .cookie(new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken))
                .param(NUMBER_PARAMETER_NAME, String.valueOf(number)));
    }

    private void 버스_즐겨찾기_조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(busLikeResponse)))
                .andDo(print())
                .andDo(toDocument("get-bus-like-success"));
    }

    private void 버스_즐겨찾기_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-bus-like-fail"));
    }

    private ResultActions 버스_노선_이미지_조회_요청(int number) throws Exception {
        return mockMvc.perform(get("/api/v1/buses/route/image")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .cookie(new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken))
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

    private ResultActions 버스_운행_종료_요청(BusRequest busRequest) throws Exception {
        return mockMvc.perform(patch("/api/v1/buses/end")
                .contextPath("/api/v1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(busRequest)));
    }

    private void 버스_운행_종료_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("end-bus-success"));
    }

    private void 버스_운행_종료_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("end-bus-fail"));
    }
}
