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
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '!', '@', '#', '$', '%', '^', '&', '*'
    };

    @Autowired
    private JavaMailSender javaMailSender;

    private static JavaMailSender staticJavaMailSender;

    @PostConstruct
    private void initStatic() {
        staticJavaMailSender = this.javaMailSender;
    }

    public static String createValidationToken() {
        return IntStream.range(0, VALIDATION_TOKEN_LENGTH)
                .mapToObj(i -> String.valueOf(CHAR_SET[(int) (Math.random() * (CHAR_SET.length))]))
                .collect(Collectors.joining());
    }

    public static void sendEmail(String email, String subject, String text) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(ADMIN_EMAIL);
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(text);
        staticJavaMailSender.send(simpleMailMessage);
    }
}
