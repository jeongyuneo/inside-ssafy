package com.inssa.backend.common.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message {

    public Message(ErrorMessage message) {
        this.message = message.getMessage();
    }

    public Message(String message) {
        this.message = message;
    }

    private String message;
}
