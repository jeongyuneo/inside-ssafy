package com.inssa.backend.bus.service;

import com.inssa.backend.bus.controller.dto.BusLikeResponse;
import com.inssa.backend.bus.controller.dto.BusResponse;
import com.inssa.backend.bus.controller.dto.RouteImageResponse;
import com.inssa.backend.bus.controller.dto.RouteResponse;
import com.inssa.backend.bus.domain.Route;
import com.inssa.backend.bus.domain.RouteRepository;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BusService {

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
        return null;
    }

    @Transactional
    public void arriveAt(Long routeId) {
        Route route = findRoute(routeId);
        route.update();
        routeRepository.save(route);
    }

    private Route findRoute(Long routeId) {
        return routeRepository.findByIdAndIsActiveTrue(routeId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_ROUTE));
    }
}
