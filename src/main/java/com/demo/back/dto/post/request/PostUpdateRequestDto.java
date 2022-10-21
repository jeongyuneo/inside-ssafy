package com.demo.back.dto.post.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostUpdateRequestDto {
    private long postId;
    private String title;
    private String content;
    private String userId;
}
