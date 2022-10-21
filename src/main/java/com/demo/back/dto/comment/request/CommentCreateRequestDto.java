package com.demo.back.dto.comment.request;

import org.springframework.lang.Nullable;

import lombok.Getter;

import com.demo.back.domain.comment.Comment;
import com.demo.back.domain.post.Post;
import com.demo.back.domain.user.User;

@Getter
public class CommentCreateRequestDto {
    @Nullable
    private Long upper;
    private String content;
    private String writer;
    private long post;

    public Comment toEntity(User user, Post post) {
        return Comment.builder()
                .upper(upper)
                .content(content)
                .writer(user)
                .post(post)
                .build();
    }
}
