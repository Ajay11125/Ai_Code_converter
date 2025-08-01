package com.CodeGPT.controller;

import com.CodeGPT.model.CodeRequest;
import com.CodeGPT.service.GptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/api")
@CrossOrigin (origins = "http://localhost:3000")
public class CodeGptController {

    @Autowired
    private GptService gptService;

    @PostMapping("/convert")
    public ResponseEntity<?> convertCode(@RequestBody CodeRequest request) {
        return ResponseEntity.ok(gptService.convertCode(request));
    }

    @PostMapping("/debug")
    public ResponseEntity<?> debugCode(@RequestBody CodeRequest request) {
        return ResponseEntity.ok(gptService.debugCode(request));
    }

    @PostMapping("/quality")
    public ResponseEntity<?> qualityCheck(@RequestBody CodeRequest request) {
        return ResponseEntity.ok(gptService.qualityCheck(request));
    }
}
