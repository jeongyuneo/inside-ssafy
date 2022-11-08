package com.inssa.backend.common.exception;

import com.inssa.backend.common.domain.ErrorMessage;

public class NotFoundException extends CommonException {

    public NotFoundException(ErrorMessage message) {
        super(message);
    }
}
