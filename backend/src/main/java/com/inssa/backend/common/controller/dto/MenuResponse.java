package com.inssa.backend.common.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MenuResponse {

    private List<String> items;
    private List<String> subItems;
}
