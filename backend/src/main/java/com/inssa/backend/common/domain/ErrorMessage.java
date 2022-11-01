package com.inssa.backend.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {

    NOT_FOUND_MEMBER("해당 회원을 찾을 수 없습니다."),
    NOT_FOUND_POST("해당 게시글을 찾을 수 없습니다."),
    NOT_FOUND_COMMENT("해당 댓글을 찾을 수 없습니다."),
    NOT_FOUND_RECOMMENT("해당 대댓글을 찾을 수 없습니다."),
    NOT_FOUND_MENU("해당 식단을 찾을 수 없습니다."),
    NOT_FOUND_BUS("해당 버스를 찾을 수 없습니다."),
    NOT_FOUND_ROUTE_IMAGE("해당 노선 이미지를 찾을 수 없습니다."),
    NOT_FOUND_ROUTE("해당 경로를 찾을 수 없습니다."),

    NOT_EQUAL_PASSWORD("비밀번호가 일치하지 않습니다."),
    NOT_EQUAL_VALIDATION_TOKEN("인증 코드가 일치하지 않습니다."),


    NOT_EDITABLE_MEMBER("편집 권한이 없는 회원입니다."),

    FAIL_TO_JOIN("회원 가입에 실패했습니다."),
    FAIL_TO_GET_POSTS("익명 게시판 목록 조회에 실패했습니다."),
    FAIL_TO_SEARCH_POST("익명 게시판 검색에 실패했습니다."),
    FAIL_TO_CREATE_POST("익명 게시판 등록에 실패했습니다."),
    FAIL_TO_CREATE_COMMENT("익명 게시판 댓글 등록에 실패했습니다."),
    FAIL_TO_CREATE_MENU("식단 등록에 실패했습니다."),

    INTERNAL_SERVER_ERROR("서버 내부 에러가 발생했습니다.");

    private final String message;
}
