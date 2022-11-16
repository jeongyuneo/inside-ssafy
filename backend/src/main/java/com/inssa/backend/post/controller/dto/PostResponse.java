package com.inssa.backend.post.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostResponse {

    private Long postId;
    private String title;
    private String content;
    private int likeCount;
    private int commentCount;
    private boolean hasPostLike;
    private boolean isEditable;
    private List<FileResponse> files;
    private List<CommentResponse> commentResponses;
}
