package com.inssa.backend.post.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostsResponse {

    private String title;
    private int likeCount;
    private int commentCount;
    private String createdDate;
}
