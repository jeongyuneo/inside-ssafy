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

    private static final String VALIDATION_EMAIL_SUBJECT = "[inside-SSAFY] 인증번호 발송";
    private static final String VALIDATION_EMAIL_TEXT_HEADER =
            "본 메일은 inside-SSAFY 사이트의 회원가입을 위한 이메일 인증입니다.\n아래의 [이메일 인증번호]를 입력하여 본인확인을 해주시기 바랍니다.";
    private static final String VALIDATION_EMAIL_TEXT_BODY = "\n\n인증번호: ";
    private static final String VALIDATION_EMAIL_TEXT_FOOTER = "\n\n감사합니다.\ninside-SSAFY 드림";
    private static final Long VALIDATION_TOKEN_DURATION = 60 * 5L;
    private static final String ID = "id";
    private static final String ROLE = "role";

    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    public void checkEmail(EmailRequest emailRequest) {
        if (memberRepository.existsByEmail(emailRequest.getEmail())) {
            throw new DuplicationException(ErrorMessage.EXISTING_EMAIL);
        }
    }

    public void sendValidationToken(String email) {
        String validationToken = MailUtil.createValidationToken();
        RedisUtil.setValidationTokenDuration(email, validationToken, VALIDATION_TOKEN_DURATION);
        MailUtil.sendEmail(email, VALIDATION_EMAIL_SUBJECT,
                VALIDATION_EMAIL_TEXT_HEADER + VALIDATION_EMAIL_TEXT_BODY + validationToken + VALIDATION_EMAIL_TEXT_FOOTER);
    }

    public void validateToken(ValidationRequest validationRequest) {
        RedisUtil.validateToken(validationRequest.getEmail(), validationRequest.getValidationToken());
    }

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
    }

    public void deleteMember(Long memberId) {
        Member member = findMember(memberId);
        member.delete();
        memberRepository.save(member);
    }

    public TokenResponse login(LoginRequest loginRequest) {
        Member member = findMemberByEmail(loginRequest.getEmail());
        member.validatePassword(passwordEncoder, loginRequest.getPassword());
        return TokenResponse.builder()
                .accessToken(JwtUtil.generateToken(member.getId(), member.getRole()))
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

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private Member findMemberByEmail(String email) {
        return memberRepository.findByEmailAndIsActiveTrue(email)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }
}
