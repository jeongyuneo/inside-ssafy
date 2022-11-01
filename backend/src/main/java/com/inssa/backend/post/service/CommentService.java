package com.inssa.backend.post.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.common.exception.UnAuthorizedException;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.domain.Comment;
import com.inssa.backend.post.domain.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    public void createComment(Long postId, CommentRequest commentRequest) {
    }

    public void updateComment(Long memberId, Long commentId, CommentRequest commentRequest) {
        Comment comment = findComment(commentId);
        checkEditable(findMember(memberId), comment);
        comment.update(commentRequest.getContent());
        commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
    }

    private Comment findComment(Long commentId) {
        return commentRepository.findByIdAndIsActiveTrue(commentId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_COMMENT));
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private void checkEditable(Member member, Comment comment) {
        if (!member.isEditable(comment.getMember().getId())) {
            throw new UnAuthorizedException(ErrorMessage.NOT_EDITABLE_MEMBER);
        }
    }
}
