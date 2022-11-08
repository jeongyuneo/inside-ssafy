package com.inssa.backend.post.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentResponse {

    private String content;
    private boolean isEditable;
    private List<ReCommentResponse> reCommentResponses;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime createdDate;
}
