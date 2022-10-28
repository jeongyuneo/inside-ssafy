package com.inssa.backend.post.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentResponse {

    private String createdDate;
    private String content;
    private List<ReCommentResponse> reCommentResponses;
}
