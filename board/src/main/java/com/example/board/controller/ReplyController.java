package com.example.board.controller;

import com.example.board.domain.Board;
import com.example.board.domain.Reply;
import com.example.board.domain.ReplyService;
import com.example.board.dto.ReplyDto;
import com.example.board.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.StringTokenizer;

@RestController
@RequestMapping("/api")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @PostMapping("/reply/{boardId}")
    public Reply createReply(@PathVariable Integer boardId, @RequestBody Reply reply) {
        System.out.println("보드아이디 : " + boardId);
        return replyService.createReply(boardId,reply);
    }

    @PutMapping("/reply/{id}")
    public ResponseEntity<Reply> updateReply(@PathVariable Integer id, @RequestBody Reply replyDetails){
        return replyService.updateReply(id, replyDetails);
    }
    @DeleteMapping("/reply/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteReply(@PathVariable Integer id) {
        return replyService.deleteReply(id);
    }
}
