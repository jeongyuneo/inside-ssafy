package com.inssa.backend.post.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByIsActiveTrue();

    List<Post> findByTitleContainingOrContentContaining(String title, String content);
}
