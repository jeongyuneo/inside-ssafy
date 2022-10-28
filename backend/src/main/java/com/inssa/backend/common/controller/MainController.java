package com.inssa.backend.common.controller;

import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.common.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class MainController {

    private final MainService mainService;

    @GetMapping
    public ResponseEntity<MainResponse> getMain() {
        return ResponseEntity.ok().body(mainService.getMain());
    }
}
