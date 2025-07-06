package com.biblioteca.biblioteca_backend.controllers;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/googlebooks")
@CrossOrigin(origins = "*")
public class GoogleBooksController {

    private final String GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";

    @GetMapping("/search")
    public ResponseEntity<List<Map<String, String>>> searchGoogleBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre) {

        String query = "";
        if (title != null && !title.isEmpty()) {
            query += "intitle:" + title;
        }
        if (genre != null && !genre.isEmpty()) {
            if (!query.isEmpty()) {
                query += "+";
            }
            query += "subject:" + genre;
        }

        String url = GOOGLE_BOOKS_API + query;
        RestTemplate restTemplate = new RestTemplate();
        String rawResponse = restTemplate.getForObject(url, String.class);

        JSONObject jsonResponse = new JSONObject(rawResponse);
        JSONArray items = jsonResponse.optJSONArray("items");

        List<Map<String, String>> books = new ArrayList<>();

        if (items != null) {
            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                JSONObject volumeInfo = item.optJSONObject("volumeInfo");

                if (volumeInfo != null) {
                    Map<String, String> book = new HashMap<>();
                    book.put("title", volumeInfo.optString("title", "Sin título"));
                    book.put("description", volumeInfo.optString("description", "Sin descripción"));

                    JSONObject imageLinks = volumeInfo.optJSONObject("imageLinks");
                    if (imageLinks != null) {
                        book.put("thumbnail", imageLinks.optString("thumbnail"));
                    } else {
                        book.put("thumbnail", "");
                    }

                    books.add(book);
                }
            }
        }

        return ResponseEntity.ok(books);
    }
}
