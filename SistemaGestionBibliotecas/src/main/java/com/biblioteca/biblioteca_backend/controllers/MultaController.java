package com.biblioteca.biblioteca_backend.controllers;

import com.biblioteca.biblioteca_backend.models.Multa;
import com.biblioteca.biblioteca_backend.models.User;
import com.biblioteca.biblioteca_backend.repositories.MultaRepository;
import com.biblioteca.biblioteca_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/multas")
@CrossOrigin(origins = "*")
public class MultaController {
    @Autowired
    private MultaRepository multaRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/usuario/{id}")
    public List<Multa> obtenerPorUsuario(@PathVariable Long id) {
        User usuario = userRepository.findById(id).orElse(null);
        if (usuario == null) return List.of();
        return multaRepository.findByUsuario(usuario);
    }
}