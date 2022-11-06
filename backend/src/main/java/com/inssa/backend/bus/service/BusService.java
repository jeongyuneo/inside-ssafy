package com.inssa.backend.bus.service;

import com.inssa.backend.bus.controller.dto.BusLikeResponse;
import com.inssa.backend.bus.controller.dto.BusResponse;
import com.inssa.backend.bus.controller.dto.RouteImageResponse;
import com.inssa.backend.bus.controller.dto.RouteResponse;
import com.inssa.backend.bus.domain.*;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.BadRequestException;
import com.inssa.backend.common.exception.DuplicationException;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.BusLike;
import com.inssa.backend.member.domain.BusLikeRepository;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
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
    private final BusLikeRepository busLikeRepository;
    private final MemberRepository memberRepository;

    public BusResponse getBus(int number) {
        Bus bus = findBusByNumber(number);
        Route lastVisited = bus.getLastVisited();
        if (bus.getLastVisited() == null) {
            return getBusResponse(bus, NO_VISITED_BUS_STOP, number == TOTAL_BUS_NUMBER);
        }
        return getBusResponse(bus, lastVisited.getBusStop().getName(), number == TOTAL_BUS_NUMBER);
    }

    public void createBusLike(Long memberId, int number) {
        Member member = findMember(memberId);
        Bus bus = findBusByNumber(number);
        if (busLikeRepository.existsByMemberAndBusAndIsActiveTrue(member, bus)) {
            throw new DuplicationException(ErrorMessage.EXISTING_BUS_LIKE);
        }

        if (busLikeRepository.existsByMemberAndBusAndIsActiveFalse(member, bus)) {
            BusLike busLike = busLikeRepository.findByMemberAndBusAndIsActiveFalse(member, bus)
                    .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_BUS_LIKE));
            busLike.create();
            busLikeRepository.save(busLike);
            return;
        }

        member.addBusLike(
                BusLike.builder()
                        .member(member)
                        .bus(bus)
                        .build()
        );
        memberRepository.save(member);
    }

    public void deleteBusLike(Long memberId, int number) {
        BusLike busLike = busLikeRepository.findByMemberAndBusAndIsActiveTrue(findMember(memberId), findBusByNumber(number))
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_BUS_LIKE));
        busLike.delete();
        busLikeRepository.save(busLike);
    }

    public List<BusLikeResponse> getBusLikes(Long memberId) {
        return findMember(memberId).getBusLikes()
                .stream()
                .sorted(Comparator.comparing(current -> current.getBus().getNumber()))
                .map(busLike -> {
                    Bus bus = busLike.getBus();
                    Route lastVisited = bus.getLastVisited();
                    if (lastVisited == null) {
                        throw new BadRequestException(ErrorMessage.NOT_AVAILABLE_BUS);
                    }
                    String lastVisitedBusStop = lastVisited.getBusStop().getName();
                    List<Route> routes = bus.getRoutes();
                    Route route = routes.stream()
                            .filter(current -> current.getBusStop().getName().equals(lastVisitedBusStop))
                            .findFirst()
                            .orElseThrow(() -> new BadRequestException(ErrorMessage.NOT_FOUND_ROUTE));
                    return BusLikeResponse.builder()
                            .number(bus.getNumber())
                            .previousBusStop(lastVisitedBusStop)
                            .nextBusStop(routes.get(route.getOrder()).getBusStop().getName())
                            .build();
                })
                .collect(Collectors.toList());
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

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
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
