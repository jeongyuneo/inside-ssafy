package com.inssa.backend.member.controller.dto;

import com.inssa.backend.post.controller.dto.PostsResponse;
import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberResponse {

    private String name;
    private String studentNumber;
    private List<PostsResponse> postsResponses;
}
