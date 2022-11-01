package com.example.board.domain;

import com.example.board.exception.ResourceNotFoundException;
import com.example.board.repository.BoardRepository;
import com.example.board.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import javax.xml.stream.events.Comment;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Transactional
    public Reply createReply(@PathVariable Integer boardId, @RequestBody Reply replyobject) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new ResourceNotFoundException("Board not exist with id :" + boardId));
            Reply reply = Reply.builder()
                    .content(replyobject.getContent())
                    .board(board)
                    .build();
        System.out.println(replyobject.getContent());
        return  replyRepository.save(reply);
    }

    public ResponseEntity<Reply> updateReply(@PathVariable Integer id, @RequestBody Reply replyDetails){
        Reply reply = replyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Reply not exist with id :" + id));
        reply.setContent(replyDetails.getContent());

        Reply updateReply = replyRepository.save(reply);
        return ResponseEntity.ok(updateReply);
    }

    public ResponseEntity<Map<String, Boolean>> deleteReply(@PathVariable Integer id) {
        Reply reply = replyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Reply not exist with id :" + id));
        replyRepository.delete(reply);
        Map <String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }



}
