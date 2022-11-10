package com.inssa.backend.common.controller.dto;

import com.inssa.backend.post.controller.dto.PostsResponse;
import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MainResponse {

    private List<Integer> busLikes;
    private MenuResponse menu;
    private List<PostsResponse> hotPosts;
}
