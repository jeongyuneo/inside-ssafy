package com.demo.back.domain.post.like;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import com.demo.back.domain.post.Post;
import com.demo.back.domain.user.User;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "post_likes")
public class PostLike {
    @Id
    private long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;
}
