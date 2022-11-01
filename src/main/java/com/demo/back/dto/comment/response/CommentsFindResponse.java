package com.demo.back.dto.comment.response;

import com.demo.back.dto.comment.recomment.response.RecommentsFindResponse;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentsFindResponse {

    private long commentId;
    private boolean isAuthorized;
    private String content;
    private String userName;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private List<RecommentsFindResponse> recomments;
}
