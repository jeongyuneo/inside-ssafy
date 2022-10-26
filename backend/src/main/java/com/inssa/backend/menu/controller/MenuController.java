package com.inssa.backend.menu.controller;

import com.inssa.backend.menu.controller.dto.MenuRequest;
import com.inssa.backend.menu.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/menus")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @PostMapping
    public ResponseEntity<Void> createMenu(@RequestHeader Long userId, @RequestBody MenuRequest menuRequest) {
        menuService.createMenu(userId, menuRequest);
        return ResponseEntity.ok().build();
    }
}
