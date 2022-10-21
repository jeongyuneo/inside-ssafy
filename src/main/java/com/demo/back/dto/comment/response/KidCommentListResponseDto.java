package com.demo.back.dto.comment.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KidCommentListResponseDto {
    private long id;
    private String content;
    private String writer;
    private LocalDateTime registDate;
}
