package com.inssa.backend.post.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.service.CommentService;
import jdk.nashorn.internal.runtime.regexp.joni.exception.InternalException;
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
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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

    @DisplayName("익명 게시판 댓글 등록 실패")
    @Test
    void create_comment_fail() throws Exception {
        // given
        willThrow(new InternalException(ErrorMessage.FAIL_TO_CREATE_COMMENT.getMessage())).given(commentService).createComment(anyLong(), any(CommentRequest.class));
        // when
        ResultActions resultActions = 익명_게시판_댓글_등록_요청(ID, commentRequest);
        // then
        익명_게시판_댓글_등록_실패(resultActions, new Message(ErrorMessage.FAIL_TO_CREATE_COMMENT));
    }

    @DisplayName("익명 게시판 댓글 수정 성공")
    @Test
    void update_comment_success() throws Exception {
        // given
        willDoNothing().given(commentService).updateComment(anyLong(), any(CommentRequest.class));
        // when
        ResultActions resultActions = 익명_게시판_댓글_수정_요청(ID, commentRequest);
        // then
        익명_게시판_댓글_수정_성공(resultActions);
    }

    @DisplayName("익명 게시판 댓글 수정 실패")
    @Test
    void update_comment_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_COMMENT)).given(commentService).updateComment(anyLong(), any(CommentRequest.class));
        // when
        ResultActions resultActions = 익명_게시판_댓글_수정_요청(ID, commentRequest);
        // then
        익명_게시판_댓글_수정_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_COMMENT));
    }

    private void 익명_게시판_댓글_수정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andDo(print())
                .andDo(toDocument("update-comment-fail"));
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

    private void 익명_게시판_댓글_등록_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-comment-fail"));
    }

    private ResultActions 익명_게시판_댓글_수정_요청(Long commentId, CommentRequest commentRequest) throws Exception {
        return mockMvc.perform(patch("/api/v1/comments/" + commentId)
                .contextPath("/api/v1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(commentRequest)));
    }

    private void 익명_게시판_댓글_수정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-comment-success"));
    }
}
