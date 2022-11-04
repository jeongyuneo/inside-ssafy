package com.inssa.backend.member.domain;

import com.inssa.backend.bus.domain.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusLikeRepository extends JpaRepository<BusLike, Long> {

    boolean existsByMemberAndBusAndIsActiveTrue(Member member, Bus bus);

    boolean existsByMemberAndBusAndIsActiveFalse(Member member, Bus bus);
}
