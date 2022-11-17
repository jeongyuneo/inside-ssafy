package com.inssa.backend.post.controller;

import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.service.ReCommentService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/recomments")
public class ReCommentController {

    private final ReCommentService reCommentService;

    @PostMapping("/comments/{commentId}")
    public ResponseEntity<Void> createReComment(@RequestHeader("Authorization") String token, @PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        reCommentService.createReComment(JwtUtil.getMemberId(token), commentId, commentRequest);
        log.info("대댓글 등록 성공");
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{reCommentId}")
    public ResponseEntity<Void> updateReComment(@RequestHeader("Authorization") String token, @PathVariable Long reCommentId, @RequestBody CommentRequest commentRequest) {
        reCommentService.updateReComment(JwtUtil.getMemberId(token), reCommentId, commentRequest);
        log.info("대댓글 수정 성공");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{reCommentId}")
    public ResponseEntity<Void> deleteReComment(@RequestHeader("Authorization") String token, @PathVariable Long reCommentId) {
        reCommentService.deleteReComment(JwtUtil.getMemberId(token), reCommentId);
        log.info("대댓글 삭제 성공");
        return ResponseEntity.ok().build();
    }
}
