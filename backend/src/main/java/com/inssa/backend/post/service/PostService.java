package com.inssa.backend.post.service;

import com.inssa.backend.post.controller.dto.PostRequest;
import com.inssa.backend.post.controller.dto.PostResponse;
import com.inssa.backend.post.controller.dto.PostsResponse;
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

    public void createPost(PostRequest postRequest, List<MultipartFile> files) {
    }

    public void updatePost(long postId, PostRequest postRequest, List<MultipartFile> files) {
    }

    public void deletePost(Long postId) {
    }

    public void createPostLike(Long memberId, Long postId) {
    }

    public void deletePostLike(Long memberId, Long postId) {
    }
}
