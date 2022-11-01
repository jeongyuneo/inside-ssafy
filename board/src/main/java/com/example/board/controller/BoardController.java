package com.example.board.controller;

import com.example.board.domain.Board;
import com.example.board.domain.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BoardController {
    @Autowired
    private BoardService boardService;

    // create board rest api
    @PostMapping("/boards")
    public Board createBoard(@RequestBody Board board) {
        return boardService.createBoard(board);
    }

    // list all boards
    @GetMapping("/boards")
    public List<Board> listAllBoards() {
        return boardService.listBoards();
    }

    // update board
    @PutMapping("/boards/{id}")
    public ResponseEntity<Board> updateBoard(
            @PathVariable Integer id, @RequestBody Board boardDetails) {
        return boardService.updateBoard(id, boardDetails);
    }

    // delete board
    @DeleteMapping("/boards/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBoard(@PathVariable Integer id) {
        return boardService.deleteBoard(id);
    }
}
