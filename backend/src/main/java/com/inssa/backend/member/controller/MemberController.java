package com.inssa.backend.member.controller;

import com.inssa.backend.member.controller.dto.*;
import com.inssa.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberResponse> getMember(@PathVariable Long memberId) {
        return ResponseEntity.ok().body(memberService.getMember(memberId));
    }

    @PatchMapping("/{memberId}")
    public ResponseEntity<Void> updatePassword(@PathVariable Long memberId, @RequestBody PasswordUpdateRequest memberUpdateRequest) {
        memberService.updatePassword(memberId, memberUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long memberId) {
        memberService.deleteMember(memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok().body(memberService.login(loginRequest));
    }
}
