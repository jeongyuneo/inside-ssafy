package com.inssa.backend.post.controller;

import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.service.CommentService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/posts/{postId}")
    public ResponseEntity<Void> createComment(@RequestHeader("Authorization") String token, @PathVariable Long postId, @RequestBody CommentRequest commentRequest) {
        commentService.createComment(JwtUtil.getMemberId(token), postId, commentRequest);
        log.info("댓글 등록 성공");
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(@RequestHeader("Authorization") String token, @PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        commentService.updateComment(JwtUtil.getMemberId(token), commentId, commentRequest);
        log.info("댓글 수정 성공");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@RequestHeader("Authorization") String token, @PathVariable Long commentId) {
        commentService.deleteComment(JwtUtil.getMemberId(token), commentId);
        log.info("댓글 삭제 성공");
        return ResponseEntity.ok().build();
    }
}
