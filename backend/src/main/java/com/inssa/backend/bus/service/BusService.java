package com.inssa.backend.bus.service;

import com.inssa.backend.bus.controller.dto.*;
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
    private static final int TOTAL_BUS_NUMBER = 6;

    private final BusRepository busRepository;
    private final RouteRepository routeRepository;
    private final BusLikeRepository busLikeRepository;
    private final MemberRepository memberRepository;

    public BusResponse getBus(Long memberId, int number) {
        Bus bus = findBusByNumber(number);
        List<Route> routes = bus.getRoutes()
                .stream()
                .filter(Route::isActive)
                .collect(Collectors.toList());
        return BusResponse.builder()
                .isLast(number == TOTAL_BUS_NUMBER)
                .hasBusLike(busLikeRepository.existsByMemberAndBusAndIsActiveTrue(findMember(memberId), bus))
                .lastVisitedBusStop(routes.indexOf(bus.getLastVisited()))
                .busStops(routes.stream()
                        .map(Route::getBusStop)
                        .map(BusStop::getName)
                        .collect(Collectors.toList()))
                .build();
    }

    @Transactional
    public void createBusLike(Long memberId, BusRequest busRequest) {
        Member member = findMember(memberId);
        Bus bus = findBusByNumber(busRequest.getNumber());
        validateBusLikeDuplication(member, bus);
        if (busLikeRepository.existsByMemberAndBusAndIsActiveFalse(member, bus)) {
            BusLike busLike = getDeletedBusLike(member, bus);
            busLike.create();
            busLikeRepository.save(busLike);
            return;
        }

        member.addBusLike(BusLike.builder()
                .member(member)
                .bus(bus)
                .build());
        memberRepository.save(member);
    }

    public void deleteBusLike(Long memberId, int number) {
        BusLike busLike = findBusLikeByMemberAndBus(memberId, number);
        busLike.delete();
        busLikeRepository.save(busLike);
    }

    public BusLikeResponse getBusLike(int number) {
        Bus bus = findBusByNumber(number);
        Route lastVisited = bus.getLastVisited();
        validateBusAvailability(lastVisited);
        return BusLikeResponse.builder()
                .previousBusStop(lastVisited.getBusStop().getName())
                .nextBusStop(bus.getRoutes()
                        .stream()
                        .filter(Route::isActive)
                        .sorted(Comparator.comparing(Route::getOrder))
                        .collect(Collectors.toList())
                        .get(lastVisited.getOrder()).getBusStop().getName())
                .build();
    }

    public RouteImageResponse getRouteImage(int number) {
        return RouteImageResponse.builder()
                .url(SITE_URL + findBusByNumber(number).getImage().getUrl())
                .build();
    }

    public List<RouteResponse> startBus(int number) {
        return routeRepository.findByBusAndIsActiveTrueOrderByOrderAsc(findBusByNumber(number))
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

    public void endBus(BusRequest busRequest) {
        Bus bus = findBusByNumber(busRequest.getNumber());
        bus.end();
        busRepository.save(bus);
    }

    private Bus findBusByNumber(int number) {
        return busRepository.findByNumberAndIsActiveTrue(number)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_BUS));
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private void validateBusLikeDuplication(Member member, Bus bus) {
        if (busLikeRepository.existsByMemberAndBusAndIsActiveTrue(member, bus)) {
            throw new DuplicationException(ErrorMessage.EXISTING_BUS_LIKE);
        }
    }

    private BusLike getDeletedBusLike(Member member, Bus bus) {
        return busLikeRepository.findByMemberAndBusAndIsActiveFalse(member, bus)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_BUS_LIKE));
    }

    private BusLike findBusLikeByMemberAndBus(Long memberId, int number) {
        return busLikeRepository.findByMemberAndBusAndIsActiveTrue(findMember(memberId), findBusByNumber(number))
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_BUS_LIKE));
    }

    private void validateBusAvailability(Route lastVisited) {
        if (lastVisited == null) {
            throw new BadRequestException(ErrorMessage.NOT_AVAILABLE_BUS);
        }
    }

    private Route findRoute(Long routeId) {
        return routeRepository.findByIdAndIsActiveTrue(routeId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_ROUTE));
    }
}
