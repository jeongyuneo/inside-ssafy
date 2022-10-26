package com.demo.back.controller.post;

import com.demo.back.dto.post.request.PostCreateRequest;
import com.demo.back.dto.post.request.PostUpdateRequest;
import com.demo.back.dto.post.response.PostFindResponse;
import com.demo.back.dto.post.response.PostsFindResponse;
import com.demo.back.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Long> addPost(@RequestParam long userId, @RequestBody PostCreateRequest postCreate) {
        return ResponseEntity.ok().body(postService.addPost(userId, postCreate));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostFindResponse> findPost(@PathVariable long postId, @RequestParam long userId) {
        return ResponseEntity.ok().body(postService.findPost(postId, userId));
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<String> modifyPost(@PathVariable long postId, @RequestParam long userId, @RequestBody PostUpdateRequest postUpdateRequestDto) {
        String response;
        try {
            response = String.valueOf(postService.modifyPost(postId, userId, postUpdateRequestDto));
        } catch (Exception e) {
            response = e.getMessage();
        }
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> removePost(@PathVariable long postId, @RequestParam long userId) {
        String response;
        try {
            response = String.valueOf(postService.removePost(postId, userId));
        } catch (Exception e) {
            response = e.getMessage();
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<List<PostsFindResponse>> findPosts() {
        return ResponseEntity.ok().body(postService.findPosts());
    }
}
