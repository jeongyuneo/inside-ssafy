package com.inssa.backend.member.service;

import com.inssa.backend.member.controller.dto.MemberRequest;
import com.inssa.backend.member.controller.dto.MemberResponse;
import com.inssa.backend.member.controller.dto.MemberUpdateRequest;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    public void join(MemberRequest memberRequest) {
    }

    public MemberResponse getMember(Long memberId) {
        return null;
    }

    public void updateMember(long memberId, MemberUpdateRequest memberUpdateRequest) {
    }
}
