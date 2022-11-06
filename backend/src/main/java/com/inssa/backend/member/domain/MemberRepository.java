package com.inssa.backend.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByIdAndIsActiveTrue(Long memberId);

    Optional<Member> findByEmailAndIsActiveTrue(String email);

    boolean existsByEmail(String email);
}
