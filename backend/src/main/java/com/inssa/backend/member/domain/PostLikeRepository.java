package com.inssa.backend.member.domain;

import com.inssa.backend.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    boolean existsByMemberAndPostAndIsActiveTrue(Member member, Post post);

    boolean existsByMemberAndPostAndIsActiveFalse(Member member, Post post);

    Optional<PostLike> findByMemberAndPostAndIsActiveFalse(Member member, Post post);
}
