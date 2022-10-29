package com.inssa.backend.post.service;

import com.inssa.backend.post.controller.dto.PostRequest;
import com.inssa.backend.post.controller.dto.PostResponse;
import com.inssa.backend.post.controller.dto.PostsResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PostService {

    public List<PostsResponse> getPosts() {
        return null;
    }

    public List<PostsResponse> searchPost(String keyword) {
        return null;
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
