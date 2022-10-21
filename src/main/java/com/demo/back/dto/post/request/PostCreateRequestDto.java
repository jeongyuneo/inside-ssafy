package com.demo.back.dto.post.request;

import lombok.Builder;
import lombok.Getter;

import com.demo.back.domain.post.Post;
import com.demo.back.domain.user.User;

@Getter
@Builder
public class PostCreateRequestDto {
    private String title;
    private String content;
    private String userId;

    public Post toEntity(User user) {
        return Post.builder()
                .title(title)
                .content(content)
                .viewCnt(0)
                .writer(user)
                .build();
    }
}
