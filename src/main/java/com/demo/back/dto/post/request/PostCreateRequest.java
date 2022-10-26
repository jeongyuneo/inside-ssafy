package com.demo.back.dto.post.request;

import com.demo.back.domain.post.Post;
import com.demo.back.domain.user.User;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostCreateRequest {

    private String title;
    private String content;

    public Post toEntity(User user) {
        return Post.builder()
                .content(content)
                .title(title)
                .user(user)
                .build();
    }
}
