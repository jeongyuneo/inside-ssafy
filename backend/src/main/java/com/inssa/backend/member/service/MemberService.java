package com.inssa.backend.member.service;

import com.inssa.backend.member.controller.dto.*;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.member.domain.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    public void join(MemberRequest memberRequest) {
        memberRepository.save(
                Member.builder()
                        .email(memberRequest.getEmail())
                        .password(passwordEncoder.encode(memberRequest.getPassword()))
                        .name(memberRequest.getName())
                        .studentNumber(memberRequest.getStudentNumber())
                        .role(Role.GENERAL)
                        .build()
        );
    }

    public MemberResponse getMember(Long memberId) {
        return null;
    }

    public void updatePassword(Long memberId, PasswordUpdateRequest memberUpdateRequest) {
    }

    public void deleteMember(Long memberId) {
    }

    public TokenResponse login(LoginRequest loginRequest) {
        return null;
    }
}
