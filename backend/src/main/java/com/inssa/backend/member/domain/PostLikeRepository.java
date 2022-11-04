package com.inssa.backend.member.domain;

import com.inssa.backend.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    boolean existsByPostAndMemberAndIsActiveTrue(Post post, Member member);
}
