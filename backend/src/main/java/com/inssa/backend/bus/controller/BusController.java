package com.inssa.backend.bus.controller;

import com.inssa.backend.bus.controller.dto.*;
import com.inssa.backend.bus.service.BusService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/buses")
public class BusController {

    private final BusService busService;

    @GetMapping
    public ResponseEntity<BusResponse> getBus(@RequestParam int number) {
        return ResponseEntity.ok().body(busService.getBus(number));
    }

    @PostMapping("/like")
    public ResponseEntity<Void> createBusLike(@RequestHeader("Authorization") String token, @RequestBody BusRequest busRequest) {
        busService.createBusLike(JwtUtil.getMemberId(token), busRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/like")
    public ResponseEntity<Void> deleteBusLike(@RequestHeader("Authorization") String token, @RequestParam int number) {
        busService.deleteBusLike(JwtUtil.getMemberId(token), number);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/like")
    public ResponseEntity<List<BusLikeResponse>> getBusLikes(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok().body(busService.getBusLikes(JwtUtil.getMemberId(token)));
    }

    @GetMapping("/route/image")
    public ResponseEntity<RouteImageResponse> getRouteImage(@RequestParam int number) {
        return ResponseEntity.ok().body(busService.getRouteImage(number));
    }

    @GetMapping("/start")
    public ResponseEntity<List<RouteResponse>> startBus(@RequestParam int number) {
        return ResponseEntity.ok().body(busService.startBus(number));
    }

    @PostMapping("/arrive/{routeId}")
    public ResponseEntity<Void> arriveAt(@PathVariable Long routeId) {
        busService.arriveAt(routeId);
        return ResponseEntity.ok().build();
    }
}
