package com.inssa.backend.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Component
public class MailUtil {

    private static final String ADMIN_EMAIL = "inside_ssafy@naver.com";
    private static final int VALIDATION_TOKEN_LENGTH = 6;
    private static final char[] CHAR_SET = new char[]{
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    };
    private static final String VALIDATION_EMAIL_SUBJECT = "[inside-SSAFY] 인증번호 발송";
    private static final String VALIDATION_EMAIL_TEXT_HEADER =
            "본 메일은 inside-SSAFY 사이트의 회원가입을 위한 이메일 인증입니다.\n아래의 [이메일 인증번호]를 입력하여 본인확인을 해주시기 바랍니다.";
    private static final String VALIDATION_EMAIL_TEXT_BODY = "\n\n인증번호: ";
    private static final String VALIDATION_EMAIL_TEXT_FOOTER = "\n\n감사합니다.\ninside-SSAFY 드림";
    private static final Long VALIDATION_TOKEN_DURATION = 60 * 5L;

    @Autowired
    private JavaMailSender javaMailSender;

    private static JavaMailSender staticJavaMailSender;

    @PostConstruct
    private void initStatic() {
        staticJavaMailSender = this.javaMailSender;
    }

    public static void sendValidationToken(String email) {
        String validationToken = createValidationToken();
        RedisUtil.setValidationTokenDuration(email, validationToken, VALIDATION_TOKEN_DURATION);
        send(email, validationToken);
    }

    private static String createValidationToken() {
        return IntStream.range(0, VALIDATION_TOKEN_LENGTH)
                .mapToObj(i -> String.valueOf(CHAR_SET[(int) (Math.random() * (CHAR_SET.length))]))
                .collect(Collectors.joining());
    }

    private static void send(String email, String validationToken) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(ADMIN_EMAIL);
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject(VALIDATION_EMAIL_SUBJECT);
        simpleMailMessage.setText(VALIDATION_EMAIL_TEXT_HEADER + VALIDATION_EMAIL_TEXT_BODY + validationToken + VALIDATION_EMAIL_TEXT_FOOTER);
        staticJavaMailSender.send(simpleMailMessage);
    }
}
