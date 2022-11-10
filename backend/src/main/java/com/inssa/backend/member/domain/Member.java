package com.inssa.backend.member.domain;

import com.inssa.backend.common.domain.BaseEntity;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotEqualException;
import com.inssa.backend.post.domain.Comment;
import com.inssa.backend.post.domain.Post;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Comment> comments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<BusLike> busLikes = new ArrayList<>();

    public void validatePassword(PasswordEncoder passwordEncoder, String password) {
        if (!passwordEncoder.matches(password, this.password)) {
            throw new NotEqualException(ErrorMessage.NOT_EQUAL_PASSWORD);
        }
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public boolean is(Long memberId) {
        return id.equals(memberId);
    }

    public void addBusLike(BusLike busLike) {
        busLikes.add(busLike);
    }
}
