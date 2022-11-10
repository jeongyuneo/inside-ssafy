package com.inssa.backend.common.controller;

import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.common.service.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class MainController {

    private final MainService mainService;

    @GetMapping
    public ResponseEntity<MainResponse> getMain() {
        MainResponse mainResponse = mainService.getMain();
        log.info("메인 페이지 조회 성공");
        return ResponseEntity.ok().body(mainResponse);
    }
}
