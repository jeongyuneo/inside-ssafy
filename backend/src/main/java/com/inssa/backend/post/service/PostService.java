package com.inssa.backend.post.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.common.exception.UnAuthorizedException;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.post.controller.dto.PostRequest;
import com.inssa.backend.post.controller.dto.PostResponse;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.domain.Post;
import com.inssa.backend.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

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

    public PostResponse getPost(Long postId) {
        return null;
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
        checkEditable(findMember(memberId), post);
        post.update(postRequest.getTitle(), postRequest.getContent(), files);
        postRepository.save(post);
    }

    public void deletePost(Long postId) {
    }

    public void createPostLike(Long memberId, Long postId) {
    }

    public void deletePostLike(Long memberId, Long postId) {
    }

    private Post findPost(Long postId) {
        return postRepository.findByIdAndIsActiveTrue(postId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_POST));
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private void checkEditable(Member member, Post post) {
        if (!member.isEditable(post.getMember().getId())) {
            throw new UnAuthorizedException(ErrorMessage.NOT_EDITABLE_MEMBER);
        }
    }
}
