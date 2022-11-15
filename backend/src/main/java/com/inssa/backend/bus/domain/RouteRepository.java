package com.inssa.backend.bus.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RouteRepository extends JpaRepository<Route, Long> {

    Optional<Route> findByIdAndIsActiveTrue(Long routeId);

    List<Route> findByBusAndIsActiveTrueOrderByOrderAsc(Bus bus);
}
