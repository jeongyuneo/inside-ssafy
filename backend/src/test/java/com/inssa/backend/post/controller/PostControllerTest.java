package com.inssa.backend.post.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.service.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.BDDMockito.willReturn;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostController.class)
public class PostControllerTest extends ApiDocument {

    private static final String TITLE = "익명 게시글 제목";
    private static final int LIKE_COUNT = 5;
    private static final int COMMENT_COUNT = 3;
    private static final String CREATED_DATE = "10/25 10:19";

    private List<PostsResponse> postsResponses;

    @MockBean
    private PostService postService;

    @BeforeEach
    void setUp() {
        postsResponses = IntStream.range(0, 2)
                .mapToObj(n -> PostsResponse.builder()
                        .title(TITLE)
                        .likeCount(LIKE_COUNT)
                        .commentCount(COMMENT_COUNT)
                        .createdDate(CREATED_DATE)
                        .build())
                .collect(Collectors.toList());
    }

    @DisplayName("익명 게시판 목록 조회 성공")
    @Test
    void get_posts_success() throws Exception {
        // given
        willReturn(postsResponses).given(postService).getPosts();
        // when
        ResultActions resultActions = 익명_게시판_목록_조회_요청();
        // then
        익명_게시판_목록_조회_성공(resultActions);
    }

    private ResultActions 익명_게시판_목록_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1/posts")
                .contextPath("/api/v1"));
    }

    private void 익명_게시판_목록_조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(postsResponses)))
                .andDo(print())
                .andDo(toDocument("get-posts-success"));
    }
}
