package com.inssa.backend.member.service;

import com.inssa.backend.member.controller.dto.LoginRequest;
import com.inssa.backend.member.controller.dto.MemberRequest;
import com.inssa.backend.member.controller.dto.MemberResponse;
import com.inssa.backend.member.controller.dto.PasswordUpdateRequest;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    public void join(MemberRequest memberRequest) {
    }

    public MemberResponse getMember(Long memberId) {
        return null;
    }

    public void updatePassword(Long memberId, PasswordUpdateRequest memberUpdateRequest) {
    }

    public void deleteMember(Long memberId) {
    }

    public void login(LoginRequest loginRequest) {
    }
}
