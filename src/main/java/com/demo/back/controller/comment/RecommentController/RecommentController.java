package com.demo.back.controller.comment.RecommentController;

import com.demo.back.dto.comment.recomment.request.RecommentCreateRequest;
import com.demo.back.dto.comment.recomment.request.RecommentUpdateRequest;
import com.demo.back.service.comment.recomment.RecommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/recomments")
public class RecommentController {

    private final RecommentService recommentService;

    @PostMapping("/{commentId}")
    public ResponseEntity<Long> addRecomment(@PathVariable long commentId, @RequestParam long userId,
                                             @RequestBody RecommentCreateRequest recommentCreateRequest) {
        return ResponseEntity.ok().body(recommentService.addRecomment(commentId, userId, recommentCreateRequest));
    }

    @PatchMapping("/{recommentId}")
    public ResponseEntity<String> modifyRecomment(@PathVariable long recommentId, @RequestParam long userId,
                                                  @RequestBody RecommentUpdateRequest recommentUpdateRequest) {
        String response;
        try {
            response = String.valueOf(recommentService.modifyRecomment(recommentId, userId, recommentUpdateRequest));
        } catch (Exception e) {
            response = e.getMessage();
        }
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{recommentId}")
    public ResponseEntity<String> removeRecomment(@PathVariable long recommentId, @RequestParam long userId) {
        String response;
        try {
            response = String.valueOf(recommentService.removeRecomment(recommentId, userId));
        } catch (Exception e) {
            response = e.getMessage();
        }
        return ResponseEntity.ok().body(response);
    }
}
