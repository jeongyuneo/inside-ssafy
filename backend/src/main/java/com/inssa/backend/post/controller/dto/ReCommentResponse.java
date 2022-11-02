package com.inssa.backend.post.controller.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReCommentResponse {

    private String content;
    private boolean isEditable;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime createdDate;
}
