package com.demo.back.domain.comment;

import java.time.LocalDateTime;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import com.demo.back.domain.post.Post;
import com.demo.back.domain.user.User;
import com.demo.back.dto.comment.request.CommentUpdateRequestDto;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "comments")
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Long upper;
    private String content;
    @CreatedDate
    private LocalDateTime registDate;
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;
    @ManyToOne(fetch = FetchType.LAZY)
    private User writer;

    public void update(CommentUpdateRequestDto commentUpdateRequestDto) {
        this.content = commentUpdateRequestDto.getContent();
    }

    public boolean isControllable(User user) {
        return writer == user;
    }
}
