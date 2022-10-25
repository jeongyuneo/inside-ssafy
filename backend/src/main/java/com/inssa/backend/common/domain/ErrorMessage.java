package com.inssa.backend.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {

    INTERNAL_SERVER_ERROR("서버 내부 에러가 발생했습니다.");

    private final String message;
}
