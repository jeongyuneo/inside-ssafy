package com.inssa.backend.common.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.common.controller.dto.MenuResponse;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.common.service.MainService;
import com.inssa.backend.member.domain.Role;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

import javax.servlet.http.Cookie;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.willReturn;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MainController.class)
public class MainControllerTest extends ApiDocument {

    private static final String TITLE = "제목";
    private static final int LIKE_COUNT = 5;
    private static final int COMMENT_COUNT = 3;
    private static final LocalDateTime CREATED_DATE = LocalDateTime.now();
    private static final List<Integer> BUS_LIKES = Arrays.asList(1, 2);
    private static final String DELIMITER = ", ";
    private static final List<String> ITEMS = Arrays.stream("코다리조림[명태:러시아산], 혼합잡곡밥, 비지찌개, 만두탕수, 상추겉절이, 포기김치".split(DELIMITER)).collect(Collectors.toList());
    private static final List<String> SUB_ITEMS = Arrays.stream("숭늉".split(DELIMITER)).collect(Collectors.toList());
    private static final Long ID = 1L;
    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, Role.GENERAL);
    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    @MockBean
    private MainService mainService;

    private String refreshToken;
    private MainResponse mainResponse;

    @BeforeEach
    void setUp() {
        Map<String, String> memberInfo = new HashMap<>();
        memberInfo.put("id", "1L");
        memberInfo.put("role", "GENERAL");
        MenuResponse menuResponse = MenuResponse.builder()
                .items(ITEMS)
                .subItems(SUB_ITEMS)
                .build();
        PostsResponse postsResponse = PostsResponse.builder()
                .postId(ID)
                .title(TITLE)
                .likeCount(LIKE_COUNT)
                .commentCount(COMMENT_COUNT)
                .createdDate(CREATED_DATE)
                .build();
        refreshToken = JwtUtil.generateToken(memberInfo);
        mainResponse = MainResponse.builder()
                .busLikes(BUS_LIKES)
                .menu(menuResponse)
                .hotPosts(IntStream.range(0, 2)
                        .mapToObj(n -> postsResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    @DisplayName("메인페이지 조회 성공")
    @Test
    void get_main_success() throws Exception {
        // given
        willReturn(mainResponse).given(mainService).getMain(anyLong());
        // when
        ResultActions resultActions = 메인페이지_조회_요청();
        // then
        메인페이지_조회_성공(resultActions);
    }

    @DisplayName("메인페이지 조회 실패")
    @Test
    void get_main_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_POST)).given(mainService).getMain(anyLong());
        // when
        ResultActions resultActions = 메인페이지_조회_요청();
        // then
        메인페이지_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_POST));
    }

    private ResultActions 메인페이지_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .cookie(new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken)));
    }

    private void 메인페이지_조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(mainResponse)))
                .andDo(print())
                .andDo(toDocument("get-main-success"));
    }

    private void 메인페이지_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-main-fail"));
    }
}
