package com.demo.back.domain.comment;

import com.demo.back.domain.BaseEntity;
import com.demo.back.domain.post.Post;
import com.demo.back.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "comment_id"))
@Entity
public class Comment extends BaseEntity {

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public void update(String content) {
        this.content = content;
    }

    public boolean isAuthorized(User user) {
        return this.user.equals(user);
    }
}
