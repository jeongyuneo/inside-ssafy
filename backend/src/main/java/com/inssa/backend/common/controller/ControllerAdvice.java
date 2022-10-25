package com.inssa.backend.common.controller;

import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({DuplicationException.class, BadRequestException.class, NotEqualException.class})
    public Message BadRequestException(CommonException exception) {
        log.info("BadRequestException: {}", exception.getMessage());
        return new Message(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnAuthorizedException.class)
    public Message UnAuthorizedException(UnAuthorizedException exception) {
        log.info("UnAuthorizedException: {}", exception.getMessage());
        return new Message(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(ForbiddenException.class)
    public Message ForbiddenException(ForbiddenException exception) {
        log.info("UnAuthorizedException: {}", exception.getMessage());
        return new Message(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public Message NotFoundException(NotFoundException exception) {
        log.info("NotFoundException: {}", exception.getMessage());
        return new Message(exception.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Message InternalServerException(Exception exception) {
        log.info("InternalServerException: {}", exception.getMessage(), exception);
        return new Message(exception.getMessage());
    }
}
