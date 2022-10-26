package com.inssa.backend.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {

    NOT_FOUND_POST("해당 게시글을 찾을 수 없습니다."),

    FAIL_TO_GET_POSTS("익명 게시판 목록 조회에 실패했습니다."),
    FAIL_TO_SEARCH_POST("익명 게시판 검색에 실패했습니다."),
    FAIL_TO_CREATE_MENU("메뉴 등록에 실패했습니다."),

    INTERNAL_SERVER_ERROR("서버 내부 에러가 발생했습니다.");

    private final String message;
}
