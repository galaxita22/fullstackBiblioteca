package com.biblioteca.biblioteca_backend.repositories;

import com.biblioteca.biblioteca_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
// Esta interfaz extiende JpaRepository, lo que proporciona métodos CRUD básicos para la entidad User.