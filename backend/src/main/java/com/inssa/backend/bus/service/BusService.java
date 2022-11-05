package com.inssa.backend.bus.service;

import com.inssa.backend.bus.controller.dto.BusLikeResponse;
import com.inssa.backend.bus.controller.dto.BusResponse;
import com.inssa.backend.bus.controller.dto.RouteImageResponse;
import com.inssa.backend.bus.controller.dto.RouteResponse;
import com.inssa.backend.bus.domain.*;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BusService {

    private static final String SITE_URL = "https://inside-ssafy.com";
    private static final String NO_VISITED_BUS_STOP = "none";
    private static final int TOTAL_BUS_NUMBER = 6;

    private final BusRepository busRepository;
    private final RouteRepository routeRepository;

    public BusResponse getBus(int number) {
        Bus bus = findBusByNumber(number);
        BusStop lastVisitedBusStop = bus.getLastVisitedBusStop();
        if (bus.getLastVisitedBusStop() == null) {
            return getBusResponse(bus, NO_VISITED_BUS_STOP, number == TOTAL_BUS_NUMBER);
        }
        return getBusResponse(bus, lastVisitedBusStop.getName(), number == TOTAL_BUS_NUMBER);
    }

    public void createBusLike(Long memberId, int number) {
    }

    public void deleteBusLike(Long memberId, int number) {
    }

    public List<BusLikeResponse> getBusLikes(Long memberId) {
        return null;
    }

    public RouteImageResponse getRouteImage(int number) {
        return RouteImageResponse.builder()
                .url(SITE_URL + findBusByNumber(number).getImage().getUrl())
                .build();
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

    @Transactional
    public void arriveAt(Long routeId) {
        Route route = findRoute(routeId);
        route.update();
        routeRepository.save(route);
    }

    private BusResponse getBusResponse(Bus bus, String lastVisitedBusStop, boolean isLast) {
        return BusResponse.builder()
                .lastVisitedBusStop(lastVisitedBusStop)
                .busStops(bus.getRoutes()
                        .stream()
                        .map(Route::getBusStop)
                        .map(BusStop::getName)
                        .collect(Collectors.toList()))
                .isLast(isLast)
                .build();
    }

    private Route findRoute(Long routeId) {
        return routeRepository.findByIdAndIsActiveTrue(routeId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_ROUTE));
    }

    private Bus findBusByNumber(int number) {
        return busRepository.findByNumberAndIsActiveTrue(number)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_BUS));
    }
}
