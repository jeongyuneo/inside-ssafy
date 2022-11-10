package com.inssa.backend.bus.controller;

import com.inssa.backend.bus.controller.dto.*;
import com.inssa.backend.bus.service.BusService;
import com.inssa.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/buses")
public class BusController {

    private final BusService busService;

    @GetMapping
    public ResponseEntity<BusResponse> getBus(@RequestHeader("Authorization") String token, @RequestParam int number) {
        BusResponse busResponse = busService.getBus(JwtUtil.getMemberId(token), number);
        log.info("버스 조회 성공");
        return ResponseEntity.ok().body(busResponse);
    }

    @PostMapping("/like")
    public ResponseEntity<Void> createBusLike(@RequestHeader("Authorization") String token, @RequestBody BusRequest busRequest) {
        busService.createBusLike(JwtUtil.getMemberId(token), busRequest);
        log.info("버스 즐겨찾기 등록 성공");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/like")
    public ResponseEntity<Void> deleteBusLike(@RequestHeader("Authorization") String token, @RequestParam int number) {
        busService.deleteBusLike(JwtUtil.getMemberId(token), number);
        log.info("버스 즐겨찾기 삭제 성공");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/like")
    public ResponseEntity<List<BusLikeResponse>> getBusLikes(@RequestHeader("Authorization") String token) {
        List<BusLikeResponse> busLikeResponses = busService.getBusLikes(JwtUtil.getMemberId(token));
        log.info("버스 즐겨찾기 목록 조회 성공");
        return ResponseEntity.ok().body(busLikeResponses);
    }

    @GetMapping("/route/image")
    public ResponseEntity<RouteImageResponse> getRouteImage(@RequestParam int number) {
        RouteImageResponse routeImageResponse = busService.getRouteImage(number);
        log.info("버스 노선 이미지 조회 성공");
        return ResponseEntity.ok().body(routeImageResponse);
    }

    @GetMapping("/start")
    public ResponseEntity<List<RouteResponse>> startBus(@RequestParam int number) {
        List<RouteResponse> routeResponses = busService.startBus(number);
        log.info("버스 운행 시작 성공");
        return ResponseEntity.ok().body(routeResponses);
    }

    @PostMapping("/arrive/{routeId}")
    public ResponseEntity<Void> arriveAt(@PathVariable Long routeId) {
        busService.arriveAt(routeId);
        log.info("버스 운행 정보 최신화 성공");
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/end")
    public ResponseEntity<Void> endBus(@RequestBody BusRequest busRequest) {
        busService.endBus(busRequest);
        log.info("버스 운행 종료 성공");
        return ResponseEntity.ok().build();
    }
}
