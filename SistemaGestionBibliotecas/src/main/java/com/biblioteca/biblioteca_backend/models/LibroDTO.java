package com.biblioteca.biblioteca_backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LibroDTO {
    public String title;
    public String author;
    public String genre;
    public String description;
    public String imageUrl;
    public int cantidadEjemplares;
}
