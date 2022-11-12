package com.inssa.backend.menu.controller;

import com.inssa.backend.menu.controller.dto.MenuRequest;
import com.inssa.backend.menu.controller.dto.MenuResponse;
import com.inssa.backend.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/menus")
public class MenuController {

    private final MenuService menuService;

    @PostMapping
    public ResponseEntity<Void> createMenu(@RequestBody MenuRequest menuRequest) {
        menuService.createMenu(menuRequest);
        log.info("식단 등록 성공");
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<MenuResponse> getMenu() {
        MenuResponse menuResponse = menuService.getMenu();
        log.info("식단 조회 성공");
        return ResponseEntity.ok().body(menuResponse);
    }
}
