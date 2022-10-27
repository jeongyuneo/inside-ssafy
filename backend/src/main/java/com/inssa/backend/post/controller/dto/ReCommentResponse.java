package com.inssa.backend.post.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReCommentResponse {

    private String createdDate;
    private String content;
}
