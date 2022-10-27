package com.inssa.backend.menu.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuResponse {
    private List<String> item;
    private String date;
    private String dayOfTheWeek;
}