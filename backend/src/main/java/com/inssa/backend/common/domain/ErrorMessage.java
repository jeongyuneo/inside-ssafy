package com.inssa.backend.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {

    FAIL_TO_GET_POSTS("익명 게시판 목록 조회에 실패했습니다."),
    FAIL_TO_SEARCH_POST("익명 게시판 검색에 실패했습니다."),

    INTERNAL_SERVER_ERROR("서버 내부 에러가 발생했습니다.");

    private final String message;
}
