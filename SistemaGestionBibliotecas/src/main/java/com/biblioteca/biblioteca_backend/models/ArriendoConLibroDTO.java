package com.biblioteca.biblioteca_backend.models;

import java.time.LocalDate;

public class ArriendoConLibroDTO {
    public Long id;
    public String codigo;
    public LocalDate fechaInicio;
    public LocalDate fechaDevolucion;
    public boolean devuelto;
    public Book book;
    public User usuario;
}