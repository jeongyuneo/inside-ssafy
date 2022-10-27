package com.inssa.backend.member.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.member.controller.dto.MemberRequest;
import com.inssa.backend.member.controller.dto.MemberResponses;
import com.inssa.backend.member.service.MemberService;
import com.inssa.backend.post.controller.dto.PostsResponse;
import jdk.nashorn.internal.runtime.regexp.joni.exception.InternalException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
public class MemberControllerTest extends ApiDocument {

    private static final String EMAIL = "ssafy@ssafy.com";
    private static final String PASSWORD = "ssafy";
    private static final String NAME = "김싸피";
    private static final String STUDENT_NUMBER = "000000";
    private static final Long ID = 1L;
    private static final String TITLE = "제목";
    private static final int LIKE_COUNT = 5;
    private static final int COMMENT_COUNT = 3;
    private static final String CREATED_DATE = "10/25 10:19";

    @MockBean
    private MemberService memberService;

    private MemberRequest memberRequest;

    private MemberResponses memberResponses;

    @BeforeEach
    void setUp() {
        PostsResponse postsResponse = PostsResponse.builder()
                .title(TITLE)
                .likeCount(LIKE_COUNT)
                .commentCount(COMMENT_COUNT)
                .createdDate(CREATED_DATE)
                .build();
        memberRequest = MemberRequest.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .name(NAME)
                .studentNumber(STUDENT_NUMBER)
                .build();
        memberResponses = MemberResponses.builder()
                .name(NAME)
                .studentNumber(STUDENT_NUMBER)
                .postsResponses(IntStream.range(0, 2)
                        .mapToObj(n -> postsResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    @DisplayName("회원가입 성공")
    @Test
    void join_success() throws Exception {
        // given
        willDoNothing().given(memberService).join(any(MemberRequest.class));
        // when
        ResultActions resultActions = 회원가입_요청(memberRequest);
        // then
        회원가입_성공(resultActions);
    }

    @DisplayName("회원가입 실패")
    @Test
    void join_fail() throws Exception {
        // given
        willThrow(new InternalException(ErrorMessage.FAIL_TO_JOIN.getMessage())).given(memberService).join(any(MemberRequest.class));
        // when
        ResultActions resultActions = 회원가입_요청(memberRequest);
        // then
        회원가입_실패(resultActions, new Message(ErrorMessage.FAIL_TO_JOIN));
    }

    @DisplayName("회원조회 성공")
    @Test
    void get_member_success() throws Exception {
        // given
        willReturn(memberResponses).given(memberService).getMember(anyLong());
        // when
        ResultActions resultActions = 회원조회_요청(ID);
        // then
        회원조회_성공(resultActions);
    }

    @DisplayName("회원조회 실패")
    @Test
    void get_member_fail() throws Exception {
        // given
        willThrow(new InternalException(ErrorMessage.FAIL_TO_GET_MEMBER.getMessage())).given(memberService).getMember(anyLong());
        // when
        ResultActions resultActions = 회원조회_요청(ID);
        // then
        회원조회_실패(resultActions,new Message(ErrorMessage.FAIL_TO_GET_MEMBER));
    }

    private ResultActions 회원가입_요청(MemberRequest memberRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members")
                .contextPath("/api/v1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(memberRequest)));
    }

    private void 회원가입_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("join-success"));
    }

    private void 회원가입_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("join-fail"));
    }

    private ResultActions 회원조회_요청(Long memberId) throws Exception {
        return mockMvc.perform(get("/api/v1/members/" + memberId)
                .contextPath("/api/v1"));
    }

    private void 회원조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(memberResponses)))
                .andDo(print())
                .andDo(toDocument("get-member-success"));
    }

    private void 회원조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-member-fail"));
    }
}
