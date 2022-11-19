package com.inssa.backend.member.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.DuplicationException;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.controller.dto.*;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.member.domain.Role;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.util.JwtUtil;
import com.inssa.backend.util.MailUtil;
import com.inssa.backend.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MemberService {

    private static final String ID = "id";
    private static final String ROLE = "role";

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    public void sendValidationToken(EmailRequest emailRequest) {
        String email = emailRequest.getEmail();
        validateEmailDuplication(email);
        MailUtil.sendValidationToken(email);
    }

    public void validateToken(ValidationRequest validationRequest) {
        RedisUtil.validateToken(validationRequest.getEmail(), validationRequest.getValidationToken());
    }

    public void join(MemberRequest memberRequest) {
        memberRepository.save(Member.builder()
                        .email(memberRequest.getEmail())
                        .password(passwordEncoder.encode(memberRequest.getPassword()))
                        .name(memberRequest.getName())
                        .campus(memberRequest.getCampus())
                        .studentNumber(memberRequest.getStudentNumber())
                        .role(Role.GENERAL)
                        .build());
    }

    public MemberResponse getMember(Long memberId) {
        Member member = findMember(memberId);
        return MemberResponse.builder()
                .name(member.getName())
                .studentNumber(member.getStudentNumber())
                .postsResponses(member.getPosts()
                        .stream()
                        .map(post -> PostsResponse.builder()
                                .postId(post.getId())
                                .title(post.getTitle())
                                .likeCount(post.getLikeCount())
                                .commentCount(post.getCommentCount())
                                .createdDate(post.getCreatedDate())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public void updatePassword(Long memberId, PasswordUpdateRequest memberUpdateRequest) {
        Member member = findMember(memberId);
        member.validatePassword(passwordEncoder, memberUpdateRequest.getPassword());
        member.updatePassword(passwordEncoder.encode(memberUpdateRequest.getNewPassword()));
        memberRepository.save(member);
    }

    public void deleteMember(Long memberId) {
        Member member = findMember(memberId);
        member.delete();
        memberRepository.save(member);
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Member member = findMemberByEmail(loginRequest.getEmail());
        member.validatePassword(passwordEncoder, loginRequest.getPassword());
        return LoginResponse.builder()
                .accessToken(JwtUtil.generateToken(member.getId(), member.getRole()))
                .campus(member.getCampus())
                .build();
    }

    public Map<String, String> getMemberInfo(LoginRequest loginRequest) {
        Member member = findMemberByEmail(loginRequest.getEmail());
        return new HashMap<String, String>() {
            {
                put(ID, String.valueOf(member.getId()));
                put(ROLE, member.getRole().toString());
            }
        };
    }

    private void validateEmailDuplication(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new DuplicationException(ErrorMessage.EXISTING_EMAIL);
        }
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private Member findMemberByEmail(String email) {
        return memberRepository.findByEmailAndIsActiveTrue(email)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }
}
