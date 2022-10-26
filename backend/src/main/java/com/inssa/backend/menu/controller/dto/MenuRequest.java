package com.inssa.backend.menu.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuRequest {

    private String item;
    private String date;
    private String dayOfTheWeek;
}
