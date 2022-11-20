package com.inssa.backend.post.controller;

import com.inssa.backend.post.controller.dto.*;
import com.inssa.backend.post.service.PostService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<PostsResponseWithPageInfo> getPosts(Pageable pageable) {
        PostsResponseWithPageInfo postsResponses = postService.getPosts(pageable);
        log.info("게시글 목록 조회 성공");
        return ResponseEntity.ok().body(postsResponses);
    }

    @GetMapping("/search")
    public ResponseEntity<PostsResponseWithPageInfo> searchPost(@RequestParam String keyword, Pageable pageable) {
        PostsResponseWithPageInfo postsResponses = postService.searchPost(keyword, pageable);
        log.info("게시글 검색 성공");
        return ResponseEntity.ok().body(postsResponses);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getPost(@RequestHeader("Authorization") String token, @PathVariable Long postId) {
        PostResponse postResponse = postService.getPost(JwtUtil.getMemberId(token), postId);
        log.info("게시글 조회 성공");
        return ResponseEntity.ok().body(postResponse);
    }

    @PostMapping
    public ResponseEntity<PostCreateResponse> createPost(@RequestHeader("Authorization") String token, @RequestPart PostRequest postRequest, @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        PostCreateResponse postCreateResponse = postService.createPost(JwtUtil.getMemberId(token), postRequest, files);
        log.info("게시글 등록 성공");
        return ResponseEntity.ok().body(postCreateResponse);
    }

    @PostMapping("/update/{postId}")
    public ResponseEntity<Void> updatePost(@RequestHeader("Authorization") String token, @PathVariable Long postId, @RequestPart PostUpdateRequest postUpdateRequest, @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        postService.updatePost(JwtUtil.getMemberId(token), postId, postUpdateRequest, files);
        log.info("게시글 수정 성공");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@RequestHeader("Authorization") String token, @PathVariable Long postId) {
        postService.deletePost(JwtUtil.getMemberId(token), postId);
        log.info("게시글 삭제 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/like/{postId}")
    public ResponseEntity<Void> createPostLike(@RequestHeader("Authorization") String token, @PathVariable Long postId) {
        postService.createPostLike(JwtUtil.getMemberId(token), postId);
        log.info("게시글 좋아요 등록 성공");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/like/{postId}")
    public ResponseEntity<Void> deletePostLike(@RequestHeader("Authorization") String token, @PathVariable Long postId) {
        postService.deletePostLike(JwtUtil.getMemberId(token), postId);
        log.info("게시글 좋아요 삭제 성공");
        return ResponseEntity.ok().build();
    }
}
