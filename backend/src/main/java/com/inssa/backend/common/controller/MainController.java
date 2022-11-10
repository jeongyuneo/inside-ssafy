package com.inssa.backend.common.controller;

import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.common.service.MainService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MainController {

    private final MainService mainService;

    @GetMapping
    public ResponseEntity<MainResponse> getMain(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok().body(mainService.getMain(JwtUtil.getMemberId(token)));
    }
}
