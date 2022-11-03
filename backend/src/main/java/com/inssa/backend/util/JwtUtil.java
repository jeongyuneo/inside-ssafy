package com.inssa.backend.util;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.UnAuthorizedException;
import com.inssa.backend.member.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class JwtUtil {

    private static final String JWT_HEADER = "Authorization";
    private static final String SECRET = "ssafy second semester third project - inssa";
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 60 * 60;
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 60 * 60 * 24 * 14;
    private static final long MILLISECOND_TO_SECOND = 1000L;
    private static final String AUTHORIZATION_TYPE = "Bearer";
    private static final String DELIMITER = " ";
    private static final int TOKEN = 1;
    private static final String ID = "id";
    private static final String ROLE = "role";

    public static String generateToken(Long memberId, Role role) {
        Claims claims = Jwts.claims();
        claims.put(ID, memberId);
        claims.put(ROLE, role);
        return createToken(claims, ACCESS_TOKEN_EXPIRATION_TIME * MILLISECOND_TO_SECOND);
    }

    public static String generateToken(Map<String, String> member) {
        Claims claims = Jwts.claims();
        claims.put(ID, member.get(ID));
        claims.put(ROLE, member.get(ROLE));
        return createToken(claims, REFRESH_TOKEN_EXPIRATION_TIME * MILLISECOND_TO_SECOND);
    }

    public static Long getMemberId(String token) {
        return Long.parseLong(String.valueOf(getAllClaims(getActualToken(token)).get(ID)));
    }

    public static Role getMemberRole(String token) {
        return Role.valueOf((String) getAllClaims(getActualToken(token)).get(ROLE));
    }

    public static boolean isExpired(String token) {
        try {
            getAllClaims(getActualToken(token));
        } catch (ExpiredJwtException accessTokenException) {
            return true;
        }
        return false;
    }

    private static String createToken(Claims claims, long expireTime) {
        return Jwts.builder()
                .setSubject(JWT_HEADER)
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(SignatureAlgorithm.HS256, SECRET.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    private static Claims getAllClaims(String token) throws ExpiredJwtException {
        return Jwts.parser()
                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
                .parseClaimsJws(token)
                .getBody();
    }

    private static String getActualToken(String token) {
        validateAuthorization(token);
        return token.split(DELIMITER)[TOKEN];
    }

    private static void validateAuthorization(String token) {
        if (!token.startsWith(AUTHORIZATION_TYPE + DELIMITER)) {
            throw new UnAuthorizedException(ErrorMessage.WRONG_TOKEN);
        }
    }
}
