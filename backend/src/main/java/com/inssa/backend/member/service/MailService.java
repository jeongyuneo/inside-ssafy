package com.inssa.backend.member.service;

import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotEqualException;
import com.inssa.backend.member.controller.dto.EmailAuthRequest;
import com.inssa.backend.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RequiredArgsConstructor
@Service
public class MailService {

    private static final String JOIN_INSSAFY_MESSAGE = "inSSAFY: 회원가입 인증번호 안내";
    private static final String VALIDATION_TOKEN = "인증번호: ";
    private static final String NOTIFICATION_MESSAGE = "\n해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
    private static final char[] CHAR_SET = new char[]{
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '!', '@', '#', '$', '%', '^', '&', '*'};
    private static final String ADMIN_EMAIL = "inssafy@naver.com";
    private final JavaMailSender javaMailSender;

    public void sendEmailValidationToken(String email) {
        String emailValidateToken = createRandomString();
        RedisUtil.setDataExpired(email, emailValidateToken, 60 * 3L);
        sendMailMessage(email, JOIN_INSSAFY_MESSAGE,
                VALIDATION_TOKEN + emailValidateToken + NOTIFICATION_MESSAGE);
    }

    public void validateSignUpEmail(EmailAuthRequest emailAuthRequest) {
        if (!RedisUtil.validateData(emailAuthRequest.getEmail(), emailAuthRequest.getAuthToken())) {
            throw new NotEqualException(ErrorMessage.NOT_EQUAL_VALIDATION_TOKEN);
        }
    }

    private String createRandomString() {
        return IntStream.range(0, 6)
                .mapToObj(i -> String.valueOf(CHAR_SET[(int) (Math.random() * (CHAR_SET.length))]))
                .collect(Collectors.joining());
    }

    private void sendMailMessage(String email, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(ADMIN_EMAIL);
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        javaMailSender.send(simpleMailMessage);
    }
}
