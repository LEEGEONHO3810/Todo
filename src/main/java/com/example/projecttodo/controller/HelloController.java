package com.example.projecttodo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class HelloController {
    @GetMapping("/api/test")
    public List<String> hello() {
        return Arrays.asList("리123213 ", "연결 성공");
    }
}