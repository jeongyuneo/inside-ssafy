package com.demo.back.domain.comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.back.domain.post.Post;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPostAndUpper(Post post, Long upper);
    List<Comment> findAllByUpper(Long upper);
    void deleteByUpper(Long upper);
}
