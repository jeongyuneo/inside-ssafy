package com.demo.back.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Controller {
    public ResponseEntity<Map<String, Object>> getResponseEntity(Object object) {
        Map<String, Object> result = new HashMap<>();
        try {
            result.put("item", object);
            return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            result.put("item", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
