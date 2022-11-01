package com.inssa.backend.menu.controller.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuResponse {

    private String  startDate;
    private String endDate;
    private List<ItemsResponse> menus;
}
