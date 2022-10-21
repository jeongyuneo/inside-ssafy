package com.example.board.dto;

import lombok.Data;

@Data
public class ReplyDto {

    private Integer id;
    private String content;
    private Integer boardId;

}
