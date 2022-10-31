package com.inssa.backend.member.domain;

import com.inssa.backend.common.domain.BaseEntity;
import com.inssa.backend.post.domain.Comment;
import com.inssa.backend.post.domain.Post;
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
@AttributeOverride(name = "id", column = @Column(name = "member_id"))
@Entity
public class Member extends BaseEntity {

    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String name;

    @NotNull
    private String studentNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Post> posts = new ArrayList<>();
}
