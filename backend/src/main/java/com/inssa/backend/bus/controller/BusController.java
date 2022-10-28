package com.inssa.backend.bus.controller;

import com.inssa.backend.bus.controller.dto.BusResponse;
import com.inssa.backend.bus.service.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/buses")
public class BusController {

    private final BusService busService;

    @GetMapping
    public ResponseEntity<BusResponse> getBus(@RequestParam int number) {
        return ResponseEntity.ok().body(busService.getBus(number));
    }

    @GetMapping("like")
    public ResponseEntity<Void> createBusLike(@RequestHeader("Authorization") String token, @RequestParam int number) {
        busService.createBusLike(1L, number);
        return ResponseEntity.ok().build();
    }
}
