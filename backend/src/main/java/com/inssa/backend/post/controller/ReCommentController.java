package com.inssa.backend.post.controller;

import com.inssa.backend.post.controller.dto.CommentRequest;
import com.inssa.backend.post.service.ReCommentService;
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
        reCommentService.createReComment(1L, reCommentId, commentRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{reCommentId}")
    public ResponseEntity<Void> deleteReComment(@RequestHeader("Authorization") String token, @PathVariable Long reCommentId) {
        reCommentService.deleteReComment(1L, reCommentId);
        return ResponseEntity.ok().build();
    }
}
