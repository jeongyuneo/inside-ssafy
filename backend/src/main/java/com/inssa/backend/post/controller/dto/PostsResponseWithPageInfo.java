package com.inssa.backend.post.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostsResponseWithPageInfo {

    private List<PostsResponse> postsResponses;
    private boolean isLast;
}
