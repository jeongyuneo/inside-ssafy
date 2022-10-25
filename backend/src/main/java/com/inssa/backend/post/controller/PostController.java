package com.inssa.backend.post.controller;

import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
