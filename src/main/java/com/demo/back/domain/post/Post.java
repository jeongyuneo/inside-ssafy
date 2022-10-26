package com.demo.back.domain.post;

import com.demo.back.domain.BaseEntity;
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
@AttributeOverride(name = "id", column = @Column(name = "post_id"))
@Entity
public class Post extends BaseEntity {

    private int likeCount;
    private int viewCount;
    private String content;
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public void update(String content, String title) {
        this.content = content;
        this.title = title;
    }

    public void view() {
        viewCount++;
    }

    public void like() {
        likeCount++;
    }

    public boolean isAuthorized(User user) {
        return this.user.equals(user);
    }
}
