package com.inssa.backend.post.service;

import com.inssa.backend.common.domain.ErrorMessage;
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

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    public void createComment(Long memberId, Long postId, CommentRequest commentRequest) {
        Member member = findMember(memberId);
        Post post = findPost(postId);
        commentRepository.save(
                Comment.builder()
                        .content(commentRequest.getContent())
                        .member(member)
                        .post(post)
                        .build()
        );
        post.addComment();
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
