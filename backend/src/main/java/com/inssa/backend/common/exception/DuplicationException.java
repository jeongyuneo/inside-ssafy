package com.inssa.backend.common.exception;

import com.inssa.backend.common.domain.ErrorMessage;

public class DuplicationException extends CommonException {

    public DuplicationException(ErrorMessage message) {
        super(message);
    }
}
