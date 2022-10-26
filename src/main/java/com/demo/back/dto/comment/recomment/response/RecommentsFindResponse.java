package com.demo.back.dto.comment.recomment.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommentsFindResponse {

    private long recommentId;
    private boolean isAuthorized;
    private String content;
    private String userName;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
