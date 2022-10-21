package com.demo.back.domain.post;

import java.time.LocalDateTime;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import com.demo.back.domain.user.User;
import com.demo.back.dto.post.request.PostUpdateRequestDto;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "posts")
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String content;
    @CreatedDate
    private LocalDateTime registDate;
    private int viewCnt;
    @ManyToOne(fetch = FetchType.LAZY)
    private User writer;

    public void update(PostUpdateRequestDto postUpdateRequestDto) {
        updateTitle(postUpdateRequestDto.getTitle());
        updateContent(postUpdateRequestDto.getContent());
    }

    private void updateTitle(String title) {
        this.title = title;
    }

    private void updateContent(String content) {
        this.content = content;
    }

    public void addViewCnt() {
        viewCnt++;
    }

    public boolean isControllable(User user) {
        return writer == user;
    }
}
