package com.inssa.backend.bus.controller;

import com.inssa.backend.bus.controller.dto.BusResponse;
import com.inssa.backend.bus.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/buses")
public class BusController {

    private final BusService busService;

    @GetMapping
    public ResponseEntity<BusResponse> getBus(@RequestParam int number) {
        return ResponseEntity.ok().body(busService.getBus(number));
    }
}
