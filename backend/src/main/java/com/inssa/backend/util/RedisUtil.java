package com.inssa.backend.util;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotEqualException;
import com.inssa.backend.common.exception.UnAuthorizedException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class RedisUtil {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private static StringRedisTemplate staticRedisTemplate;

    @PostConstruct
    private void initStatic() {
        staticRedisTemplate = this.redisTemplate;
    }

    public static String getValidationToken(String email) {
        return staticRedisTemplate.opsForValue().get(email);
    }

    public static void setValidationTokenDuration(String email, String validationToken, long duration) {
        Duration expireDuration = Duration.ofSeconds(duration);
        staticRedisTemplate.opsForValue().set(email, validationToken, expireDuration);
    }

    public static void validateToken(String email, String validationToken) {
        validateExpiration(email);
        if (!getValidationToken(email).equals(validationToken)) {
            throw new NotEqualException(ErrorMessage.NOT_EQUAL_VALIDATION_TOKEN);
        }
    }

    private static void validateExpiration(String email) {
        if (getValidationToken(email) == null) {
            throw new UnAuthorizedException(ErrorMessage.EXPIRED_VALIDATION_TOKEN);
        }
    }
}
