package com.inssa.backend.post.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
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

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime createdDate;
}
