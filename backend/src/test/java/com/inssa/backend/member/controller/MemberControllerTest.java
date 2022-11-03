package com.inssa.backend.member.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.controller.dto.*;
import com.inssa.backend.member.domain.Role;
import com.inssa.backend.member.service.MemberService;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.util.JwtUtil;
import jdk.nashorn.internal.runtime.regexp.joni.exception.InternalException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
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
    private static final LocalDateTime CREATED_DATE = LocalDateTime.now();
    private static final String NEW_PASSWORD = "newssafy";
    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";
    private static final String ACCESS_TOKEN = JwtUtil.generateToken(ID, Role.GENERAL);
    private static final String COOKIE = ResponseCookie.from("refreshToken", JwtUtil.generateToken(ID, Role.GENERAL))
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .path("/")
            .maxAge(60 * 60 * 24 * 14)
            .domain("inside-ssafy.com")
            .build()
            .toString();

    @MockBean
    private MemberService memberService;

    private MemberRequest memberRequest;
    private MemberResponse memberResponse;
    private PasswordUpdateRequest memberUpdateRequest;
    private LoginRequest loginRequest;
    private TokenResponse tokenResponse;

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
        memberResponse = MemberResponse.builder()
                .name(NAME)
                .studentNumber(STUDENT_NUMBER)
                .postsResponses(IntStream.range(0, 2)
                        .mapToObj(n -> postsResponse)
                        .collect(Collectors.toList()))
                .build();
        memberUpdateRequest = PasswordUpdateRequest.builder()
                .password(PASSWORD)
                .newPassword(NEW_PASSWORD)
                .build();
        loginRequest = LoginRequest.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .build();
        tokenResponse = TokenResponse.builder()
                .accessToken(ACCESS_TOKEN)
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
        willReturn(memberResponse).given(memberService).getMember(anyLong());
        // when
        ResultActions resultActions = 회원조회_요청();
        // then
        회원조회_성공(resultActions);
    }

    @DisplayName("회원조회 실패")
    @Test
    void get_member_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(memberService).getMember(anyLong());
        // when
        ResultActions resultActions = 회원조회_요청();
        // then
        회원조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    @DisplayName("비밀번호 수정 성공")
    @Test
    void update_member_success() throws Exception {
        // given
        willDoNothing().given(memberService).updatePassword(anyLong(), any(PasswordUpdateRequest.class));
        // when
        ResultActions resultActions = 비밀번호_수정_요청();
        // then
        비밀번호_수정_성공(resultActions);
    }

    @DisplayName("비밀번호 수정 실패")
    @Test
    void update_member_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(memberService).updatePassword(anyLong(), any(PasswordUpdateRequest.class));
        // when
        ResultActions resultActions = 비밀번호_수정_요청();
        // then
        비밀번호_수정_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    @DisplayName("회원탈퇴 성공")
    @Test
    void delete_member_success() throws Exception {
        // given
        willDoNothing().given(memberService).deleteMember(anyLong());
        // when
        ResultActions resultActions = 회원탈퇴_요청();
        // then
        회원탈퇴_성공(resultActions);
    }

    @DisplayName("회원탈퇴 실패")
    @Test
    void delete_member_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(memberService).deleteMember(anyLong());
        // when
        ResultActions resultActions = 회원탈퇴_요청();
        // then
        회원탈퇴_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    @DisplayName("로그인 성공")
    @Test
    void login_success() throws Exception {
        // given
        willReturn(tokenResponse).given(memberService).login(any(LoginRequest.class));
        // when
        ResultActions resultActions = 로그인_요청(loginRequest);
        // then
        로그인_성공(resultActions);
    }

    @DisplayName("로그인 실패")
    @Test
    void login_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER)).given(memberService).login(any(LoginRequest.class));
        // when
        ResultActions resultActions = 로그인_요청(loginRequest);
        // then
        로그인_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private ResultActions 회원가입_요청(MemberRequest memberRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members")
                .contextPath("/api/v1")
                .contentType(MediaType.APPLICATION_JSON)
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .header(HttpHeaders.SET_COOKIE, COOKIE)
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

    private ResultActions 회원조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1/members")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .header(HttpHeaders.SET_COOKIE, COOKIE));
    }

    private void 회원조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(memberResponse)))
                .andDo(print())
                .andDo(toDocument("get-member-success"));
    }

    private void 회원조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-member-fail"));
    }

    private ResultActions 비밀번호_수정_요청() throws Exception {
        return mockMvc.perform(patch("/api/v1/members")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .header(HttpHeaders.SET_COOKIE, COOKIE)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(memberUpdateRequest)));
    }

    private void 비밀번호_수정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-password-success"));
    }

    private void 비밀번호_수정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-password-fail"));
    }

    private ResultActions 회원탈퇴_요청() throws Exception {
        return mockMvc.perform(delete("/api/v1/members")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .header(HttpHeaders.SET_COOKIE, COOKIE));
    }

    private void 회원탈퇴_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("delete-member-success"));
    }

    private void 회원탈퇴_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("delete-member-fail"));
    }

    private ResultActions 로그인_요청(LoginRequest loginRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/members/login")
                .contextPath("/api/v1")
                .header(AUTHORIZATION, BEARER + ACCESS_TOKEN)
                .header(HttpHeaders.SET_COOKIE, COOKIE)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(loginRequest)));
    }

    private void 로그인_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(tokenResponse)))
                .andDo(print())
                .andDo(toDocument("login-success"));
    }

    private void 로그인_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("login-fail"));
    }
}
