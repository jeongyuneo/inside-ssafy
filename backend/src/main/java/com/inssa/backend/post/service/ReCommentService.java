package com.inssa.backend.post.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.domain.Comment;
import com.inssa.backend.post.domain.CommentRepository;
import com.inssa.backend.post.domain.ReComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReCommentService {

    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    public void createReComment(Long memberId, Long commentId, CommentRequest commentRequest) {
        Comment comment = findComment(commentId);
        comment.addReComment(
                ReComment.builder()
                        .content(commentRequest.getContent())
                        .member(findMember(memberId))
                        .comment(comment)
                        .build()
        );
        commentRepository.save(comment);
    }

    public void updateReComment(Long memberId, Long reCommentId, CommentRequest commentRequest) {
    }

    public void deleteReComment(Long memberId, Long reCommentId) {
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private Comment findComment(Long commentId) {
        return commentRepository.findByIdAndIsActiveTrue(commentId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_COMMENT));
    }
}
