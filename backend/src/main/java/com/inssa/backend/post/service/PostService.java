package com.inssa.backend.post.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.DuplicationException;
import com.inssa.backend.common.exception.ForbiddenException;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.member.domain.PostLike;
import com.inssa.backend.member.domain.PostLikeRepository;
import com.inssa.backend.post.controller.dto.*;
import com.inssa.backend.member.domain.PostLike;
import com.inssa.backend.member.domain.PostLikeRepository;
import com.inssa.backend.post.controller.dto.PostRequest;
import com.inssa.backend.post.controller.dto.PostResponse;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.domain.Post;
import com.inssa.backend.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final PostLikeRepository postLikeRepository;

    public List<PostsResponse> getPosts() {
        return postRepository.findByIsActiveTrue()
                .stream()
                .map(post -> PostsResponse.builder()
                        .postId(post.getId())
                        .title(post.getTitle())
                        .likeCount(post.getLikeCount())
                        .commentCount(post.getCommentCount())
                        .createdDate(post.getCreatedDate())
                        .build())
                .collect(Collectors.toList());
    }

    public List<PostsResponse> searchPost(String keyword) {
        return postRepository.SearchByTitleOrContentAndIsActiveTrue(keyword)
                .stream()
                .map(post -> PostsResponse.builder()
                        .postId(post.getId())
                        .title(post.getTitle())
                        .likeCount(post.getLikeCount())
                        .commentCount(post.getCommentCount())
                        .createdDate(post.getCreatedDate())
                        .build())
                .collect(Collectors.toList());
    }

    public PostResponse getPost(Long memberId, Long postId) {
        Post post = findPost(postId);
        return PostResponse.builder()
                .title(post.getTitle())
                .content(post.getContent())
                .likeCount(post.getLikeCount())
                .commentCount(post.getCommentCount())
                .hasPostLike(postLikeRepository.existsByMemberAndPostAndIsActiveTrue(findMember(memberId), post))
                .isEditable(post.isEditableBy(memberId))
                .files(post.getImages()
                        .stream()
                        .map(image -> FileResponse.builder()
                                .url(image.getUrl())
                                .build())
                        .collect(Collectors.toList()))
                .commentResponses(post.getComments()
                        .stream()
                        .map(comment -> CommentResponse.builder()
                                .content(comment.getContent())
                                .createdDate(comment.getCreatedDate())
                                .isEditable(comment.isEditableBy(memberId))
                                .reCommentResponses(comment.getReComments()
                                        .stream()
                                        .map(reComment -> ReCommentResponse.builder()
                                                .content(reComment.getContent())
                                                .createdDate(reComment.getCreatedDate())
                                                .isEditable(reComment.isEditableBy(memberId))
                                                .build())
                                        .collect(Collectors.toList()))
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public void createPost(Long memberId, PostRequest postRequest, List<MultipartFile> files) {
        Post post = Post.builder()
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .member(findMember(memberId))
                .build();
        post.saveImages(files);
        postRepository.save(post);
    }

    public void updatePost(Long memberId, Long postId, PostRequest postRequest, List<MultipartFile> files) {
        Post post = findPost(postId);
        checkEditable(memberId, post);
        post.update(postRequest.getTitle(), postRequest.getContent(), files);
        postRepository.save(post);
    }

    public void deletePost(Long memberId, Long postId) {
        Post post = findPost(postId);
        checkEditable(memberId, post);
        post.delete();
        postRepository.save(post);
    }

    @Transactional
    public void createPostLike(Long memberId, Long postId) {
        Member member = findMember(memberId);
        Post post = findPost(postId);
        if (postLikeRepository.existsByMemberAndPostAndIsActiveTrue(member, post)) {
            throw new DuplicationException(ErrorMessage.EXISTING_POST_LIKE);
        }

        if (postLikeRepository.existsByMemberAndPostAndIsActiveFalse(member, post)) {
            PostLike postLike = postLikeRepository.findByMemberAndPostAndIsActiveFalse(member, post)
                    .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_POST_LIKE));
            postLike.activatePostLike();
            postLikeRepository.save(postLike);
            return;
        }

        post.addLike(PostLike.builder()
                .member(member)
                .post(post)
                .build());
        postRepository.save(post);
    }

    @Transactional
    public void deletePostLike(Long memberId, Long postId) {
        PostLike postLike = postLikeRepository.findByMemberAndPostAndIsActiveTrue(findMember(memberId), findPost(postId))
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_POST_LIKE));
        postLike.delete();
        postLikeRepository.save(postLike);
    }

    private Post findPost(Long postId) {
        return postRepository.findByIdAndIsActiveTrue(postId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_POST));
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private void checkEditable(Long memberId, Post post) {
        if (!post.isEditableBy(memberId)) {
            throw new ForbiddenException(ErrorMessage.NOT_EDITABLE_MEMBER);
        }
    }
}
