package com.inssa.backend.common.controller;

import com.inssa.backend.common.controller.dto.FavoritesBusResponse;
import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.common.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class MainController {

    private final MainService mainService;

    @GetMapping("/buses/{memberId}")
    public ResponseEntity<List<FavoritesBusResponse>> getFavoritesBus(@PathVariable Long memberId) {
        return ResponseEntity.ok().body(mainService.getFavoritesBus(memberId));
    }

    @GetMapping
    public ResponseEntity<MainResponse> getMain() {
        return ResponseEntity.ok().body(mainService.getMain());
    }
}
