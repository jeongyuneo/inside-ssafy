package com.inssa.backend.post.domain;

import com.inssa.backend.common.domain.BaseEntity;
import com.inssa.backend.member.domain.Member;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "post_id"))
@Entity
public class Post extends BaseEntity {

    @NotNull
    private String title;

    @NotNull
    private String content;

    private int likeCount;
    private int commentCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Comment> comments = new ArrayList<>();

    public void addComment(Comment comment) {
        comments.add(comment);
        commentCount++;
    }
}
