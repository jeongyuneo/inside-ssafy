package com.inssa.backend.bus.service;

import com.inssa.backend.bus.controller.dto.BusLikeResponse;
import com.inssa.backend.bus.controller.dto.BusResponse;
import com.inssa.backend.bus.controller.dto.RouteImageResponse;
import com.inssa.backend.bus.controller.dto.RouteResponse;
import com.inssa.backend.bus.domain.Bus;
import com.inssa.backend.bus.domain.BusRepository;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BusService {

    private static final String SITE_URL = "https://inside-ssafy.com";

    private final BusRepository busRepository;

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
        return RouteImageResponse.builder()
                .url(SITE_URL + findBus(number).getImage().getUrl())
                .build();
    }

    public List<RouteResponse> startBus(int number) {
        return null;
    }

    public void arriveAt(Long routeId) {
    }

    private Bus findBus(int number) {
        return busRepository.findByNumber(number)
                .orElseThrow(() -> new BadRequestException(ErrorMessage.NOT_FOUND_BUS));
    }
}
