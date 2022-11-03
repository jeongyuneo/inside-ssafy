package com.inssa.backend.member.controller;

import com.inssa.backend.member.controller.dto.*;
import com.inssa.backend.member.service.MemberService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join/token/request")
    public ResponseEntity<Void> sendValidationToken(@RequestParam String email) {
        memberService.sendValidationToken(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/join/token/validation")
    public ResponseEntity<Void> validateToken(@RequestBody ValidationRequest validationRequest) {
        memberService.validateToken(validationRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> join(@RequestBody MemberRequest memberRequest) {
        memberService.join(memberRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<MemberResponse> getMember(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok().body(memberService.getMember(JwtUtil.getMemberId(token)));
    }

    @PatchMapping
    public ResponseEntity<Void> updatePassword(@RequestHeader("Authorization") String token, @RequestBody PasswordUpdateRequest memberUpdateRequest) {
        memberService.updatePassword(JwtUtil.getMemberId(token), memberUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember(@RequestHeader("Authorization") String token) {
        memberService.deleteMember(JwtUtil.getMemberId(token));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest) {
        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", JwtUtil.generateToken(memberService.getMemberInfo(loginRequest)))
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(60 * 60 * 24 * 14)
                .domain("inside-ssafy.com")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(memberService.login(loginRequest));
    }
}
