package com.inssa.backend.member.domain;

import com.inssa.backend.bus.domain.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusLikeRepository extends JpaRepository<BusLike, Long> {

    Optional<BusLike> findByMemberAndBusAndIsActiveTrue(Member member, Bus bus);
}
