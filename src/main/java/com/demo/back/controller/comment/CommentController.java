package com.demo.back.controller.comment;

import com.demo.back.dto.comment.request.CommentCreateRequest;
import com.demo.back.dto.comment.request.CommentUpdateRequest;
import com.demo.back.dto.comment.response.CommentsFindResponse;
import com.demo.back.service.comment.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{postId}")
    public ResponseEntity<Long> addComment(@PathVariable long postId, @RequestParam long userId,
                                           @RequestBody CommentCreateRequest commentCreateRequestDto) {
        return ResponseEntity.ok().body(commentService.addComment(postId, userId, commentCreateRequestDto));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentsFindResponse>> findComments(@PathVariable long postId, @RequestParam long userId) {
        return ResponseEntity.ok().body(commentService.findComments(postId, userId));
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<String> modifyComment(@PathVariable long commentId, @RequestParam long userId,
                                                @RequestBody CommentUpdateRequest commentUpdateRequestDto) {
        String response;
        try {
            response = String.valueOf(commentService.modifyComment(commentId, userId, commentUpdateRequestDto));
        } catch (Exception e) {
            response = e.getMessage();
        }
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> removeComment(@PathVariable long commentId, @RequestParam long userId) {
        String response;
        try {
            response = String.valueOf(commentService.removeComment(commentId, userId));
        } catch (Exception e) {
            response = e.getMessage();
        }
        return ResponseEntity.ok().body(response);
    }
}
