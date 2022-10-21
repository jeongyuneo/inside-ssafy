package com.demo.back.dto.comment.request;

import lombok.Getter;

@Getter
public class CommentUpdateRequestDto {
    private long commentId;
    private String content;
    private String writer;
}
