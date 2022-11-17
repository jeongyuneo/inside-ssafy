package com.inssa.backend.post.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findByIdAndIsActiveTrue(Long postId);

    Page<Post> findByIsActiveTrue(Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.isActive = true AND (p.title LIKE CONCAT('%', :keyword, '%') OR p.content LIKE CONCAT('%', :keyword, '%'))")
    List<Post> SearchByTitleOrContentAndIsActiveTrue(@Param("keyword") String keyword);

    List<Post> findTop5ByIsActiveTrueAndLikeCountGreaterThanEqualOrderByCreatedDateDesc(int likeCount);
}
