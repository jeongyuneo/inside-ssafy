package com.inssa.backend.post.controller;

import com.inssa.backend.post.controller.dto.PostResponse;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostsResponse>> getPosts() {
        return ResponseEntity.ok().body(postService.getPosts());
    }

    @GetMapping("/search")
    public ResponseEntity<List<PostsResponse>> searchPost(@RequestParam String keyword) {
        return ResponseEntity.ok().body(postService.searchPost(keyword));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long postId) {
        return ResponseEntity.ok().body(postService.getPost(postId));
    }
}
