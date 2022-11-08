package com.inssa.backend.menu.service;

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

    public void createMenu(MenuRequest menuRequest) {
        menuRepository.save(
                Menu.builder()
                        .date(menuRequest.getDate())
                        .dayOfTheWeek(menuRequest.getDayOfTheWeek())
                        .item(String.join(DELIMITER, menuRequest.getItems()))
                        .subItem(String.join(DELIMITER, menuRequest.getSubItems()))
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
                        .subItems(Arrays.stream(menu.getSubItem().split(DELIMITER)).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
        return MenuResponse.builder()
                .startDate(itemsResponses.get(MONDAY).getDate())
                .endDate(itemsResponses.get(FRIDAY).getDate())
                .menus(itemsResponses)
                .build();
    }
}
