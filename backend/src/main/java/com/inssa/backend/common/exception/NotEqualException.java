package com.inssa.backend.common.exception;

import com.inssa.backend.common.domain.ErrorMessage;

public class NotEqualException extends CommonException {

        public NotEqualException(ErrorMessage message) {
            super(message);
        }
}
