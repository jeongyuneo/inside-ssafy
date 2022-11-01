package com.inssa.backend.menu.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuRequest {

    private String date;
    private String dayOfTheWeek;
    private List<String> items;
}
