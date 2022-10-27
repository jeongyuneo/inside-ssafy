package com.inssa.backend.bus.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BusStopResponse {

    private String name;
    private double latitude;
    private double longitude;
}
