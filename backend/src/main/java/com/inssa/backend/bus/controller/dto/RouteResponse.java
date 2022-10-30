package com.inssa.backend.bus.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RouteResponse {

    private Long routeId;
    private String name;
    private double latitude;
    private double longitude;
}
