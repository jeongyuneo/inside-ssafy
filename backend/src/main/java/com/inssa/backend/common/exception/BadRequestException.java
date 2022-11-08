package com.inssa.backend.common.exception;

import com.inssa.backend.common.domain.ErrorMessage;

public class BadRequestException extends CommonException {

    public BadRequestException(ErrorMessage message) {
        super(message);
    }
}
