package com.demo.back.dto.comment.recomment.request;

import com.demo.back.domain.comment.Comment;
import com.demo.back.domain.comment.recomment.Recomment;
import com.demo.back.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecommentCreateRequest {

    private String content;

    public Recomment toEntity(Comment comment, User user) {
        return Recomment.builder()
                .content(content)
                .comment(comment)
                .user(user)
                .build();
    }
}
