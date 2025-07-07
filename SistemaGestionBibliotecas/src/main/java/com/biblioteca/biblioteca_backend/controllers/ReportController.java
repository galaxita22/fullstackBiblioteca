package com.biblioteca.biblioteca_backend.controllers;

import com.biblioteca.biblioteca_backend.repositories.BookRepository;
import com.biblioteca.biblioteca_backend.repositories.UserRepository;
import com.biblioteca.biblioteca_backend.repositories.ArriendoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.biblioteca.biblioteca_backend.repositories.MultaRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/report")
@CrossOrigin(origins = "*")
public class ReportController {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MultaRepository multaRepository;

    @Autowired
    private ArriendoRepository arriendoRepository;

    @GetMapping("/resumen")
    public Map<String, Long> obtenerResumen() {
        Map<String, Long> resumen = new HashMap<>();
        resumen.put("totalLibros", bookRepository.count());
        resumen.put("librosDisponibles", bookRepository.countByEstado("local"));
        resumen.put("librosPrestados", bookRepository.countByEstado("arrendado"));
        resumen.put("totalUsuarios", userRepository.count());
        resumen.put("arriendosActivos", arriendoRepository.countByDevueltoFalse());
        resumen.put("multasPendientes", multaRepository.countByPagadaFalse());
        return resumen;
    }
}
