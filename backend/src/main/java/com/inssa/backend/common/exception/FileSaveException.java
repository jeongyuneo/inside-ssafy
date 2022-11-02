package com.inssa.backend.common.exception;

import com.inssa.backend.common.domain.ErrorMessage;

public class FileSaveException extends CommonException {

    public FileSaveException(ErrorMessage message) {
        super(message);
    }
}
