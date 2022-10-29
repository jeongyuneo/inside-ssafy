package com.inssa.backend.main.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.common.controller.MainController;
import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.common.service.MainService;
import com.inssa.backend.post.controller.dto.PostsResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
    private static final String CREATED_DATE = "10/25 10:19";
    private static final List<String> ITEMS = Arrays.stream("코다리조림[명태:러시아산], 혼합잡곡밥, 비지찌개, 만두탕수, 상추겉절이, 포기김치".split(", ")).collect(Collectors.toList());

    @MockBean
    private MainService mainService;

    private MainResponse mainResponse;

    @BeforeEach
    void setUp() {
        PostsResponse postsResponse = PostsResponse.builder()
                .title(TITLE)
                .likeCount(LIKE_COUNT)
                .commentCount(COMMENT_COUNT)
                .createdDate(CREATED_DATE)
                .build();
        mainResponse = MainResponse.builder()
                .menus(ITEMS)
                .hotposts(IntStream.range(0, 2)
                        .mapToObj(n -> postsResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    @DisplayName("메인페이지 조회 성공")
    @Test
    void get_main_success() throws Exception {
        // given
        willReturn(mainResponse).given(mainService).getMain();
        // when
        ResultActions resultActions = 메인페이지_조회_요청();
        // then
        메인페이지_조회_성공(resultActions);
    }

    @DisplayName("메인페이지 조회 실패")
    @Test
    void get_main_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_POST)).given(mainService).getMain();
        // when
        ResultActions resultActions = 메인페이지_조회_요청();
        // then
        메인페이지_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_POST));
    }

    private ResultActions 메인페이지_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1")
                .contextPath("/api/v1"));
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
