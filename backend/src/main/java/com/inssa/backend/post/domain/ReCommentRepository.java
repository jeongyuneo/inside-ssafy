package com.inssa.backend.post.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReCommentRepository extends JpaRepository<ReComment, Long> {
    Optional<ReComment> findByIdAndIsActiveTrue(Long reCommentId);
}
