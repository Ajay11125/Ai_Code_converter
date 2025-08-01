package com.CodeGPT;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeGptApplication {
    public static void main(String[] args) {
        SpringApplication.run(CodeGptApplication.class, args);
    }
    @PostConstruct
    public void init() {
        System.out.println("🚀 CodeGPT Backend is running...");
    }
}