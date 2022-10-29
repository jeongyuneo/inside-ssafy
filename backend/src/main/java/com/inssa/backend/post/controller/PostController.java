package com.inssa.backend.post.controller;

import com.inssa.backend.post.controller.dto.PostRequest;
import com.inssa.backend.post.controller.dto.PostResponse;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping
    public ResponseEntity<Void> createPost(@RequestPart PostRequest postRequest, @RequestPart("files") List<MultipartFile> files) {
        postService.createPost(postRequest, files);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update/{postId}")
    public ResponseEntity<Void> updatePost(@PathVariable Long postId, @RequestPart PostRequest postRequest, @RequestPart("files") List<MultipartFile> files) {
        postService.updatePost(postId, postRequest, files);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/like/{postId}")
    public ResponseEntity<Void> createPostLike(@RequestHeader("Authorization") String token, @PathVariable Long postId) {
        postService.createPostLike(1L, postId);
        return ResponseEntity.ok().build();
    }
}
