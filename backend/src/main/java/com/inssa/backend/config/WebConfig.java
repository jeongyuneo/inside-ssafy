package com.inssa.backend.config;

import com.inssa.backend.interceptor.JwtAuthFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String[] EXCLUDE_PATH_PATTERNS = {
            "/docs/**",
            "/images/**",
            "/members/login",
            "/members/join/**",
            "/buses/start",
            "/buses/arrive/**",
            "/buses/end"
    };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "Set-Cookie")
                .maxAge(6000);
    }

    @Override
    public void addInterceptors(final InterceptorRegistry interceptorRegistry) {
        interceptorRegistry.addInterceptor(new JwtAuthFilter())
                .excludePathPatterns(EXCLUDE_PATH_PATTERNS);
    }
}
