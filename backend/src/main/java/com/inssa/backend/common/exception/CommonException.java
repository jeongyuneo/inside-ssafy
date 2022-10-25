package com.inssa.backend.common.exception;

import com.inssa.backend.common.domain.ErrorMessage;

public class CommonException extends RuntimeException {

    public CommonException(ErrorMessage message) {
        super(message.getMessage());
    }
}
