package com.demo.back.dto.post.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostDetailResponseDto {
    private long id;
    private String title;
    private String content;
    private String writer;
    private LocalDateTime registDate;
    private int viewCnt;
}
