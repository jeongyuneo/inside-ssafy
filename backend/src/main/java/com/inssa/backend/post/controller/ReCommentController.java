package com.inssa.backend.post.controller;

import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.service.ReCommentService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/recomments")
public class ReCommentController {

    private final ReCommentService reCommentService;

    @PostMapping("/{reCommentId}")
    public ResponseEntity<Void> createReComment(@RequestHeader("Authorization") String token, @PathVariable Long reCommentId, @RequestBody CommentRequest commentRequest) {
        reCommentService.createReComment(JwtUtil.getMemberId(token), reCommentId, commentRequest);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{reCommentId}")
    public ResponseEntity<Void> updateReComment(@RequestHeader("Authorization") String token, @PathVariable Long reCommentId, @RequestBody CommentRequest commentRequest) {
        reCommentService.updateReComment(JwtUtil.getMemberId(token), reCommentId, commentRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{reCommentId}")
    public ResponseEntity<Void> deleteReComment(@RequestHeader("Authorization") String token, @PathVariable Long reCommentId) {
        reCommentService.deleteReComment(JwtUtil.getMemberId(token), reCommentId);
        return ResponseEntity.ok().build();
    }
}
