package com.inssa.backend.menu.controller;

import com.inssa.backend.menu.controller.dto.MenuRequest;
import com.inssa.backend.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/menus")
public class MenuController {

    private final MenuService menuService;

    @PostMapping("/{userId}")
    public ResponseEntity<Void> createMenu(@PathVariable Long userId, @RequestBody MenuRequest menuRequest) {
        menuService.createMenu(userId, menuRequest);
        return ResponseEntity.ok().build();
    }
}
