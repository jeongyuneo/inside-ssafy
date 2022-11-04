package com.inssa.backend.bus.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RouteRepository extends JpaRepository<Route, Long> {

    List<Route> findByBusOrderByOrderAsc(Bus bus);
}
