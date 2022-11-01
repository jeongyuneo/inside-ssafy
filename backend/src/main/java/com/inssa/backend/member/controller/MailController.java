package com.inssa.backend.member.controller;

import com.inssa.backend.member.controller.dto.EmailAuthRequest;
import com.inssa.backend.member.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/mails")
public class MailController {

    private final MailService mailService;

    @PostMapping("/send")
    public ResponseEntity<Void> sendEmailValidationToken(@RequestParam String email) {
        mailService.sendEmailValidationToken(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/validate")
    public ResponseEntity<Void> validateSignUpEmail(@RequestBody EmailAuthRequest emailAuthRequest) {
        mailService.validateSignUpEmail(emailAuthRequest);
        return ResponseEntity.ok().build();
    }
}
