package com.demo.back.dto.comment.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentListResponseDto {
    private long id;
    private String content;
    private String writer;
    private LocalDateTime registDate;
    private List<KidCommentListResponseDto> kids;
}
