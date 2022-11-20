package com.inssa.backend.post.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.ForbiddenException;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.domain.Comment;
import com.inssa.backend.post.domain.CommentRepository;
import com.inssa.backend.post.domain.Post;
import com.inssa.backend.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    @Transactional
    public void createComment(Long memberId, Long postId, CommentRequest commentRequest) {
        Post post = findPost(postId);
        post.addComment(Comment.builder()
                .content(commentRequest.getContent())
                .member(findMember(memberId))
                .post(post)
                .build());
        postRepository.save(post);
    }

    public void updateComment(Long memberId, Long commentId, CommentRequest commentRequest) {
        Comment comment = findComment(commentId);
        validateEditable(memberId, comment);
        comment.update(commentRequest.getContent());
        commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Long memberId, Long commentId) {
        Comment comment = findComment(commentId);
        validateEditable(memberId, comment);
        comment.delete();
        commentRepository.save(comment);
    }

    private Post findPost(Long postId) {
        return postRepository.findByIdAndIsActiveTrue(postId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_POST));
    }

    private Comment findComment(Long commentId) {
        return commentRepository.findByIdAndIsActiveTrue(commentId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_COMMENT));
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private void validateEditable(Long memberId, Comment comment) {
        if (!comment.isEditableBy(memberId)) {
            throw new ForbiddenException(ErrorMessage.NOT_EDITABLE_MEMBER);
        }
    }
}
