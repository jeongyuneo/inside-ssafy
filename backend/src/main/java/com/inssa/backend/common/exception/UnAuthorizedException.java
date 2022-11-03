package com.inssa.backend.common.exception;

import com.inssa.backend.common.domain.ErrorMessage;

public class UnAuthorizedException extends CommonException {

    public UnAuthorizedException(ErrorMessage message) {
        super(message);
    }

    public UnAuthorizedException(String message) {
        super(message);
    }
}
