package com.inssa.backend.member.domain;

import com.inssa.backend.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    Optional<PostLike> findByMemberAndPostAndIsActiveTrue(Member member, Post post);
}
