package com.inssa.backend.common.exception;

import com.inssa.backend.common.domain.ErrorMessage;

public class ForbiddenException extends CommonException {

    public ForbiddenException(ErrorMessage message) {
        super(message);
    }
}
