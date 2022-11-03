package com.inssa.backend.post.domain;

import com.inssa.backend.common.domain.BaseEntity;
import com.inssa.backend.member.domain.Member;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "comment_id"))
@Entity
public class Comment extends BaseEntity {

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder.Default
    @OneToMany(mappedBy = "comment", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ReComment> reComments = new ArrayList<>();

    @Override
    public void delete() {
        super.delete();
        post.deleteComment();
    }

    public boolean isEditableBy(Long memberId) {
        return member.is(memberId);
    }

    public void update(String content) {
        this.content = content;
    }

    public void addReComment(ReComment reComment) {
        reComments.add(reComment);
        post.addReComment();
    }

    public void deleteReComment() {
        post.deleteComment();
    }
}
