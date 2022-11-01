package com.demo.back.dto.post.request;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostUpdateRequest {

    private String content;
    private String title;
}
