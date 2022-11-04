package com.inssa.backend.bus.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusRepository extends JpaRepository<Bus, Long> {

    Optional<Bus> findByNumberAndIsActiveTrue(int number);
}
