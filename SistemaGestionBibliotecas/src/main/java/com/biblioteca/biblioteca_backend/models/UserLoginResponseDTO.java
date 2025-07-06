package com.biblioteca.biblioteca_backend.models;

public class UserLoginResponseDTO {
    private Long id;
    private String email;
    private String role;

    public UserLoginResponseDTO(Long id, String email, String role) {
        this.id = id;
        this.email = email;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}
