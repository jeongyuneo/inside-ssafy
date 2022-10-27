package com.inssa.backend.post.service;

import com.inssa.backend.post.controller.dto.PostResponse;
import com.inssa.backend.post.controller.dto.PostsResponse;
import org.springframework.stereotype.Service;

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

    public void deletePost(Long postId) {
    }
}
