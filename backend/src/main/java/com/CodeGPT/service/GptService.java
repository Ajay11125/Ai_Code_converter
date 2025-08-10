package com.CodeGPT.service;

import com.CodeGPT.model.CodeRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
public class GptService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBWkCL5RR2tImSG9XZ-lOTsKEZ4LdmItds";

    public String convertCode(CodeRequest request) {
        String prompt = String.format("Convert this %s code to %s:\n%s and give only Code in result",
                request.getSourceLang(), request.getTargetLang(), request.getCode());
        return callOpenAI(prompt);
    }

    public String debugCode(CodeRequest request) {
        String prompt = "Debug this code:\n" + request.getCode();
        return callOpenAI(prompt);
    }

    public String qualityCheck(CodeRequest request) {
        String prompt = "Evaluate the code quality and suggest improvements:\n" + request.getCode();
        return callOpenAI(prompt);
    }

    private String callOpenAI(String prompt) {
        try {
            HttpClient client = HttpClient.newHttpClient();

            JSONObject requestBody = new JSONObject();
            requestBody.put("contents", new org.json.JSONArray()
                    .put(new JSONObject().put("parts", new org.json.JSONArray()
                            .put(new JSONObject().put("text", prompt)))));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(endpoint))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("OpenAI Raw Response: " + response.body());

            System.out.println("=== Status Code ===");
            System.out.println(response.statusCode());
            System.out.println("=== Response Body ===");
            System.out.println(response.body());

            if (response.statusCode() != 200) {
                return "OpenAI API Error: " + response.body();
            }

            if (response.statusCode() != 200) {
                return "Error: OpenAI API returned status " + response.statusCode() + "\n" + response.body();
            }

            JSONObject jsonResponse = new JSONObject(response.body());


            return jsonResponse.getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling OpenAI: " + e.getMessage();
        }
    }

}

