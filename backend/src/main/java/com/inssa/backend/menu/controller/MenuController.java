package com.inssa.backend.menu.controller;

import com.inssa.backend.menu.controller.dto.MenuRequest;
import com.inssa.backend.menu.controller.dto.MenuResponse;
import com.inssa.backend.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/menus")
public class MenuController {

    private final MenuService menuService;

    @PostMapping
    public ResponseEntity<Void> createMenu(@RequestHeader("Authorization") String token, @RequestBody MenuRequest menuRequest) {
        menuService.createMenu(3L, menuRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<MenuResponse> getMenu() {
        return ResponseEntity.ok().body(menuService.getMenu());
    }
}
