package com.inssa.backend.post.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByIsActiveTrue();

    @Query(value = "SELECT * FROM post WHERE title LIKE %:keyword% OR content LIKE %:keyword% ", nativeQuery = true)
    List<Post> findSearchAndIsActiveTrue(@Param("keyword") String keyword);
}
