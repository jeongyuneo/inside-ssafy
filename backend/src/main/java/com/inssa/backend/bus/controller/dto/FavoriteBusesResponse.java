package com.inssa.backend.bus.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoriteBusesResponse {

    private int number;
    private String previousBusStop;
    private String nextBusStop;
}
