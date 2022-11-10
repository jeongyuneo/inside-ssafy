package com.inssa.backend.menu.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findByIsActiveTrue();

    Optional<Menu> findByDateEqualsAndIsActiveTrue(LocalDate date);
}
