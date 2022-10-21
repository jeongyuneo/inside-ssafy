package com.demo.back.controller.comment;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.demo.back.controller.Controller;
import com.demo.back.dto.comment.request.CommentCreateRequestDto;
import com.demo.back.dto.comment.request.CommentUpdateRequestDto;
import com.demo.back.service.comment.CommentService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/comment")
public class CommentController extends Controller {
    private final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> commentAdd(@RequestBody CommentCreateRequestDto commentCreateRequestDto) {
        return getResponseEntity(commentService.addComment(commentCreateRequestDto));
    }

    @PutMapping("")
    public ResponseEntity<Map<String, Object>> commentModify(@RequestBody CommentUpdateRequestDto commentUpdateRequestDto) throws Exception {
        return getResponseEntity(commentService.modifyComment(commentUpdateRequestDto));
    }

    @DeleteMapping("")
    public ResponseEntity<Map<String, Object>> commentRemove(@RequestParam String userId, @RequestParam long commentId) throws Exception {
        return getResponseEntity(commentService.removeComment(userId, commentId));
    }

    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> commentList(@RequestParam long postId) {
        return getResponseEntity(commentService.findCommentList(postId));
    }
}
