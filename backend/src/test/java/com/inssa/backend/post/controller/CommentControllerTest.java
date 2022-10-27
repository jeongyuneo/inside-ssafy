package com.inssa.backend.post.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.service.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CommentController.class)
public class CommentControllerTest extends ApiDocument {

    private static final Long ID = 1L;
    private static final String CONTENT = "본문";

    @MockBean
    private CommentService commentService;

    private CommentRequest commentRequest;

    @BeforeEach
    void setUp() {
        commentRequest = CommentRequest.builder()
                .content(CONTENT)
                .build();
    }

    @DisplayName("익명 게시판 댓글 등록 성공")
    @Test
    void create_comment_success() throws Exception {
        // given
        willDoNothing().given(commentService).createComment(anyLong(), any(CommentRequest.class));
        // when
        ResultActions resultActions = 익명_게시판_댓글_등록_요청(ID, commentRequest);
        // then
        익명_게시판_댓글_등록_성공(resultActions);
    }

    private ResultActions 익명_게시판_댓글_등록_요청(Long postId, CommentRequest commentRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/comments/posts/" + postId)
                .contextPath("/api/v1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(commentRequest)));
    }

    private void 익명_게시판_댓글_등록_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-comment-success"));
    }
}
