package com.inssa.backend.common.controller.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FavoritesBusResponse {

    private int busId;
    private String beforeBusStop;
    private String afterBusStop;
}
