package com.inssa.backend.post.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.Role;
import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.service.ReCommentService;
import com.inssa.backend.util.JwtUtil;
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
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReCommentController.class)
public class ReCommentControllerTest extends ApiDocument {

    private static final Long ID = 1L;
    private static final String CONTENT = "본문";
    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, Role.GENERAL);

    @MockBean
    private ReCommentService reCommentService;

    private CommentRequest commentRequest;

    @BeforeEach
    void setUp() {
        commentRequest = CommentRequest.builder()
                .content(CONTENT)
                .build();
    }

    @DisplayName("익명 게시판 대댓글 등록 성공")
    @Test
    void create_recomment_success() throws Exception {
        // given
        willDoNothing().given(reCommentService).createReComment(anyLong(), anyLong(), any(CommentRequest.class));
        // when
        ResultActions resultActions = 익명_게시판_대댓글_등록_요청(ID, commentRequest);
        // then
        익명_게시판_대댓글_등록_성공(resultActions);
    }

    @DisplayName("익명 게시판 대댓글 등록 실패")
    @Test
    void create_recomment_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_RECOMMENT)).given(reCommentService).createReComment(anyLong(), anyLong(), any(CommentRequest.class));
        // when
        ResultActions resultActions = 익명_게시판_대댓글_등록_요청(ID, commentRequest);
        // then
        익명_게시판_대댓글_등록_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_RECOMMENT));
    }

    @DisplayName("익명 게시판 대댓글 수정 성공")
    @Test
    void update_recomment_success() throws Exception {
        // given
        willDoNothing().given(reCommentService).updateReComment(anyLong(), anyLong(), any(CommentRequest.class));
        // when
        ResultActions resultActions = 익명_게시판_대댓글_수정_요청(ID, commentRequest);
        // then
        익명_게시판_대댓글_수정_성공(resultActions);
    }

    @DisplayName("익명 게시판 대댓글 수정 실패")
    @Test
    void update_recomment_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_RECOMMENT)).given(reCommentService).updateReComment(anyLong(), anyLong(), any(CommentRequest.class));
        // when
        ResultActions resultActions = 익명_게시판_대댓글_수정_요청(ID, commentRequest);
        // then
        익명_게시판_대댓글_수정_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_RECOMMENT));
    }

    @DisplayName("익명 게시판 대댓글 삭제 성공")
    @Test
    void delete_recomment_success() throws Exception {
        // given
        willDoNothing().given(reCommentService).deleteReComment(anyLong(), anyLong());
        // when
        ResultActions resultActions = 익명_게시판_대댓글_삭제_요청(ID);
        // then
        익명_게시판_대댓글_삭제_성공(resultActions);
    }

    @DisplayName("익명 게시판 대댓글 삭제 실패")
    @Test
    void delete_recomment_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_RECOMMENT)).given(reCommentService).deleteReComment(anyLong(), anyLong());
        // when
        ResultActions resultActions = 익명_게시판_대댓글_삭제_요청(ID);
        // then
        익명_게시판_대댓글_삭제_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_RECOMMENT));
    }

    private ResultActions 익명_게시판_대댓글_등록_요청(Long commentId, CommentRequest commentRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/recomments/" + commentId)
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(commentRequest)));
    }

    private void 익명_게시판_대댓글_등록_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-recomment-success"));
    }

    private void 익명_게시판_대댓글_등록_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-recomment-fail"));
    }

    private ResultActions 익명_게시판_대댓글_수정_요청(Long reCommentId, CommentRequest commentRequest) throws Exception {
        return mockMvc.perform(patch("/api/v1/recomments/" + reCommentId)
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(commentRequest)));
    }

    private void 익명_게시판_대댓글_수정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-recomment-success"));
    }

    private void 익명_게시판_대댓글_수정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-recomment-fail"));
    }

    private ResultActions 익명_게시판_대댓글_삭제_요청(Long reCommentId) throws Exception {
        return mockMvc.perform(delete("/api/v1/recomments/" + reCommentId)
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN));
    }

    private void 익명_게시판_대댓글_삭제_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("delete-recomment-success"));
    }

    private void 익명_게시판_대댓글_삭제_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("delete-recomment-fail"));
    }
}
