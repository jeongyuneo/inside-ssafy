package com.inssa.backend.menu.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.common.exception.UnAuthorizedException;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.menu.controller.dto.ItemsResponse;
import com.inssa.backend.menu.controller.dto.MenuRequest;
import com.inssa.backend.menu.controller.dto.MenuResponse;
import com.inssa.backend.menu.domain.Menu;
import com.inssa.backend.menu.domain.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MenuService {

    private static final int MONDAY = 0;
    private static final int FRIDAY = 4;
    private static final String DELIMITER = ", ";

    private final MenuRepository menuRepository;
    private final MemberRepository memberRepository;

    public void createMenu(Long memberId, MenuRequest menuRequest) {
        checkManager(findMember(memberId));
        menuRepository.save(
                Menu.builder()
                        .date(menuRequest.getDate())
                        .dayOfTheWeek(menuRequest.getDayOfTheWeek())
                        .item(String.join(DELIMITER, menuRequest.getItems()))
                        .build()
        );
    }

    public MenuResponse getMenu() {
        List<ItemsResponse> itemsResponses = menuRepository.findByIsActiveTrue()
                .stream()
                .map(menu -> ItemsResponse.builder()
                        .date(menu.getDate())
                        .dayOfTheWeek(menu.getDayOfTheWeek())
                        .items(Arrays.stream(menu.getItem().split(DELIMITER)).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        return MenuResponse.builder()
                .startDate(itemsResponses.get(MONDAY).getDate())
                .endDate(itemsResponses.get(FRIDAY).getDate())
                .menus(itemsResponses)
                .build();
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }

    private void checkManager(Member member) {
        if (!member.isManager()) {
            throw new UnAuthorizedException(ErrorMessage.NOT_FOUND_AUTHORITY);
        }
    }
}
