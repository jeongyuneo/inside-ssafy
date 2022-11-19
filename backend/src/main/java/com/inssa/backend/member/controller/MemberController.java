package com.inssa.backend.member.controller;

import com.inssa.backend.member.controller.dto.*;
import com.inssa.backend.member.service.MemberService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join/token/request")
    public ResponseEntity<Void> sendValidationToken(@RequestBody EmailRequest emailRequest) {
        memberService.sendValidationToken(emailRequest);
        log.info("이메일 인증 번호 전송 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/join/token/validation")
    public ResponseEntity<Void> validateToken(@RequestBody ValidationRequest validationRequest) {
        memberService.validateToken(validationRequest);
        log.info("이메일 인증 번호 검증 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> join(@RequestBody MemberRequest memberRequest) {
        memberService.join(memberRequest);
        log.info("회원가입 성공");
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<MemberResponse> getMember(@RequestHeader("Authorization") String token) {
        MemberResponse memberResponse = memberService.getMember(JwtUtil.getMemberId(token));
        log.info("회원조회 성공");
        return ResponseEntity.ok().body(memberResponse);
    }

    @PatchMapping
    public ResponseEntity<Void> updatePassword(@RequestHeader("Authorization") String token, @RequestBody PasswordUpdateRequest memberUpdateRequest) {
        memberService.updatePassword(JwtUtil.getMemberId(token), memberUpdateRequest);
        log.info("비밀번호 수정 성공");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember(@RequestHeader("Authorization") String token) {
        memberService.deleteMember(JwtUtil.getMemberId(token));
        log.info("회원탈퇴 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = memberService.login(loginRequest);
        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", JwtUtil.generateToken(memberService.getMemberInfo(loginRequest)))
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(60 * 60 * 24 * 14)
                .domain("inside-ssafy.com")
                .build();
        log.info("로그인 성공");
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(loginResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<LoginResponse> logout() {
        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", null)
                .path("/")
                .maxAge(0)
                .domain("inside-ssafy.com")
                .build();
        log.info("로그아웃 성공");
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).build();
    }
}
