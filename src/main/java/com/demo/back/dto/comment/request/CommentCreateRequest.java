package com.demo.back.dto.comment.request;

import com.demo.back.domain.comment.Comment;
import com.demo.back.domain.post.Post;
import com.demo.back.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentCreateRequest {

    private String content;

    public Comment toEntity(User user, Post post) {
        return Comment.builder()
                .content(content)
                .post(post)
                .user(user)
                .build();
    }
}
