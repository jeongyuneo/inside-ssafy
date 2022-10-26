package com.demo.back.domain.comment.recomment;

import com.demo.back.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommentRepository extends JpaRepository<Recomment, Long> {
    List<Recomment> findAllByComment(Comment comment);

    void deleteAllByComment(Comment comment);
}
