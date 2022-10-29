package com.inssa.backend.bus.controller;

import com.inssa.backend.bus.service.BusService;
import com.inssa.backend.bus.controller.dto.FavoriteBusesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/buses")
public class BusController {

    private final BusService busService;

    @GetMapping("/{memberId}")
    public ResponseEntity<List<FavoriteBusesResponse>> getBusLike(@PathVariable Long memberId) {
        return ResponseEntity.ok().body(busService.getBusLikes(memberId));
    }
}
