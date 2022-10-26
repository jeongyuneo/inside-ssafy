package com.inssa.backend.member.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.member.controller.dto.MemberRequest;
import com.inssa.backend.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
public class MemberControllerTest extends ApiDocument {

    private static final String EMAIL = "ssafy@ssafy.com";
    private static final String PASSWORD = "ssafy";
    private static final String NAME = "김싸피";
    private static final String STUDENT_NUMBER = "000000";

    @MockBean
    private MemberService memberService;

    private MemberRequest memberRequest;

    @BeforeEach
    void setUp() {
        memberRequest = MemberRequest.builder()
                .email(EMAIL)
                .password(PASSWORD)
                .name(NAME)
                .studentNumber(STUDENT_NUMBER)
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
}
