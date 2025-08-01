package com.CodeGPT.model;

import lombok.Data;

@Data
public class CodeRequest {
    private String code;
    private String sourceLang;
    private String targetLang;
}

