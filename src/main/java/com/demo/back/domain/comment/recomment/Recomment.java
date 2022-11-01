package com.demo.back.domain.comment.recomment;

import com.demo.back.domain.BaseEntity;
import com.demo.back.domain.comment.Comment;
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
@AttributeOverride(name = "id", column = @Column(name = "recomment_id"))
@Entity
public class Recomment extends BaseEntity {

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public void update(String content) {
        this.content = content;
    }

    public boolean isAuthorized(User user) {
        return this.user.equals(user);
    }
}
