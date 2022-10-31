package com.inssa.backend.post.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.domain.Comment;
import com.inssa.backend.post.domain.Post;
import com.inssa.backend.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class CommentService {

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

    public void updateComment(Long commentId, CommentRequest commentRequest) {
    }

    public void deleteComment(Long commentId) {
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private Post findPost(Long postId) {
        return postRepository.findByIdAndIsActiveTrue(postId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_POST));
    }
}
