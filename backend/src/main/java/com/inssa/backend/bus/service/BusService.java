package com.inssa.backend.bus.service;

import com.inssa.backend.bus.controller.dto.BusLikeResponse;
import com.inssa.backend.bus.controller.dto.BusResponse;
import com.inssa.backend.bus.controller.dto.RouteImageResponse;
import com.inssa.backend.bus.controller.dto.RouteResponse;
import com.inssa.backend.bus.domain.Bus;
import com.inssa.backend.bus.domain.BusRepository;
import com.inssa.backend.bus.domain.RouteRepository;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BusService {

    private final BusRepository busRepository;
    private final RouteRepository routeRepository;

    public BusResponse getBus(int number) {
        return null;
    }

    public void createBusLike(Long memberId, int number) {
    }

    public void deleteBusLike(Long memberId, int number) {
    }

    public List<BusLikeResponse> getBusLikes(Long memberId) {
        return null;
    }

    public RouteImageResponse getRouteImage(int number) {
        return null;
    }

    public List<RouteResponse> startBus(int number) {
        return routeRepository.findByBusOrderByOrderAsc(findBusByNumber(number))
                .stream()
                .map(route -> RouteResponse.builder()
                        .routeId(route.getId())
                        .name(route.getBusStop().getName())
                        .address(route.getBusStop().getAddress())
                        .build())
                .collect(Collectors.toList());
    }

    public void arriveAt(Long routeId) {
    }

    private Bus findBusByNumber(int number) {
        return busRepository.findByNumberAndIsActiveTrue(number)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_BUS));
    }
}
