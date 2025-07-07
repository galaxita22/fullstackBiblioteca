package com.biblioteca.biblioteca_backend.repositories;

import com.biblioteca.biblioteca_backend.models.Multa;
import com.biblioteca.biblioteca_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MultaRepository extends JpaRepository<Multa, Long> {
    List<Multa> findByUsuario(User usuario);
    long countByPagadaFalse();
}