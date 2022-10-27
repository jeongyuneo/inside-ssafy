package com.inssa.backend.member.controller;

import com.inssa.backend.member.controller.dto.MemberRequest;
import com.inssa.backend.member.controller.dto.MemberResponse;
import com.inssa.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<Void> join(@RequestBody MemberRequest memberRequest) {
        memberService.join(memberRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberResponse> getMember(@PathVariable Long memberId) {
        return ResponseEntity.ok().body(memberService.getMember(memberId));
    }
}
