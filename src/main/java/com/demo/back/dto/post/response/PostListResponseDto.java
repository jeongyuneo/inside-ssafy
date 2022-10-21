package com.demo.back.dto.post.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostListResponseDto {
    private long id;
    private String title;
    private LocalDateTime registDate;
    private int viewCnt;
    private String writer;
}
