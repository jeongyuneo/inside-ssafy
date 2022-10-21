package com.demo.back.controller.post;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.demo.back.controller.Controller;
import com.demo.back.dto.post.request.PostUpdateRequestDto;
import com.demo.back.service.post.PostService;
import com.demo.back.dto.post.request.PostCreateRequestDto;

@RequiredArgsConstructor
@RestController
@RequestMapping("/post")
public class PostController extends Controller {
    private final PostService postService;
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> postAdd(@RequestBody PostCreateRequestDto postCreateDto) {
        return getResponseEntity(postService.addPost(postCreateDto));
    }

    @GetMapping("")
    public ResponseEntity<Map<String, Object>> postDetails(@RequestParam long postId) {
        return getResponseEntity(postService.findPost(postId));
    }

    @PutMapping("")
    public ResponseEntity<Map<String, Object>> postModify(@RequestBody PostUpdateRequestDto postUpdateRequestDto) throws Exception {
        return getResponseEntity(postService.modifyPost(postUpdateRequestDto));
    }

    @DeleteMapping("")
    public ResponseEntity<Map<String, Object>> postRemove(@RequestParam String userId, @RequestParam long postId) throws Exception {
        return getResponseEntity(postService.removePost(userId, postId));
    }

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> postList() {
        return getResponseEntity(postService.findPostList());
    }
}
