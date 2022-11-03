package com.inssa.backend.interceptor;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.ForbiddenException;
import com.inssa.backend.common.exception.UnAuthorizedException;
import com.inssa.backend.member.domain.Role;
import com.inssa.backend.util.JwtUtil;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

public class JwtAuthFilter implements HandlerInterceptor {

    private static final String AUTHORIZATION = "Authorization";
    private static final String REFRESH_TOKEN = "refreshToken";
    private static final String JOIN_REQUEST = "/api/v1/members";
    private static final String LOGIN_REQUEST = "/api/v1/members/login";
    private static final String MENU_REQUEST = "/api/v1/menus";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String accessToken = request.getHeader(AUTHORIZATION);
        String uri = request.getRequestURI();
        String method = request.getMethod();
        if (JOIN_REQUEST.equals(uri) && HttpMethod.POST.matches(method)
                || LOGIN_REQUEST.equals(uri) && HttpMethod.POST.matches(method)) {
            return true;
        }

        if (MENU_REQUEST.equals(uri) && HttpMethod.POST.matches(method)
                && !JwtUtil.getMemberRole(accessToken).equals(Role.MANAGER.name())) {
            throw new ForbiddenException(ErrorMessage.WRONG_ACCESS);
        }

        if (accessToken == null) {
            throw new UnAuthorizedException(ErrorMessage.NOT_FOUND_TOKEN);
        }

        if (JwtUtil.isExpired(accessToken)) {
            Cookie cookie = Arrays.stream(request.getCookies())
                    .filter(cookieInfo -> cookieInfo.getName().equals(REFRESH_TOKEN))
                    .findFirst()
                    .orElseThrow(() -> new UnAuthorizedException(ErrorMessage.NOT_FOUND_TOKEN));
            String refreshToken = cookie.getValue();
            JwtUtil.validateExpiration(refreshToken);
        }
        return true;
    }
}
