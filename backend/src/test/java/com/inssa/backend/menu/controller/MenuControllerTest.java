package com.inssa.backend.menu.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.menu.controller.dto.MenuRequest;
import com.inssa.backend.menu.service.MenuService;
import jdk.nashorn.internal.runtime.regexp.joni.exception.InternalException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.BDDMockito.willThrow;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MenuController.class)
public class MenuControllerTest extends ApiDocument {

    private static final Long ID = 1L;
    private static final String USER_ID_HEADER_NAME = "userId";
    private static final String ITEM = "코다리조림[명태:러시아산], 혼합잡곡밥, 비지찌개, 만두탕수, 상추겉절이, 포기김치";
    private static final String DATE = "2022-10-27";
    private static final String DAY_OF_THE_WEEK = "목";

    @MockBean
    private MenuService menuService;

    private MenuRequest menuRequest;

    @BeforeEach
    void setUp() {
        menuRequest = MenuRequest.builder()
                .item(ITEM)
                .date(DATE)
                .dayOfTheWeek(DAY_OF_THE_WEEK)
                .build();
    }

    @DisplayName("식단 등록 성공")
    @Test
    void create_menu_success() throws Exception {
        // given
        willDoNothing().given(menuService).createMenu(anyLong(), any(MenuRequest.class));
        // when
        ResultActions resultActions = 식단_등록_요청(menuRequest);
        // then
        식단_등록_성공(resultActions);
    }

    @DisplayName("식단 등록 실패")
    @Test
    void create_menu_fail() throws Exception {
        // given
        willThrow(new InternalException(ErrorMessage.FAIL_TO_CREATE_MENU.getMessage())).given(menuService).createMenu(anyLong(), any(MenuRequest.class));
        // when
        ResultActions resultActions = 식단_등록_요청(menuRequest);
        // then
        식단_등록_실패(resultActions, new Message(ErrorMessage.FAIL_TO_CREATE_MENU));
    }

    private ResultActions 식단_등록_요청(MenuRequest menuRequest) throws Exception {
        return mockMvc.perform(post("/api/v1/menus")
                .contextPath("/api/v1")
                .header(USER_ID_HEADER_NAME, ID)
                .contentType(MediaType.APPLICATION_JSON)
                .content(toJson(menuRequest)));
    }

    private void 식단_등록_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-menu-success"));
    }

    private void 식단_등록_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-menu-fail"));
    }
}
