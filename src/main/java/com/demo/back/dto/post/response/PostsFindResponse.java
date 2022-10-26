package com.demo.back.dto.post.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostsFindResponse {

    private long postId;
    private int likeCount;
    private int viewCount;
    private String title;
    private String userName;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
