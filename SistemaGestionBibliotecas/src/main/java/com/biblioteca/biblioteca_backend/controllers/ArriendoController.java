package com.biblioteca.biblioteca_backend.controllers;

import com.biblioteca.biblioteca_backend.models.Arriendo;
import com.biblioteca.biblioteca_backend.models.Book;
import com.biblioteca.biblioteca_backend.models.ArriendoConLibroDTO;
import com.biblioteca.biblioteca_backend.models.User;
import com.biblioteca.biblioteca_backend.models.Multa;
import com.biblioteca.biblioteca_backend.repositories.ArriendoRepository;
import com.biblioteca.biblioteca_backend.repositories.BookRepository;
import com.biblioteca.biblioteca_backend.repositories.UserRepository;
import com.biblioteca.biblioteca_backend.repositories.MultaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*") // permite que el frontend acceda
@RestController
@RequestMapping({"/api/arriendos", "/api/arriendo"}) // acepta ambas rutas
public class ArriendoController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArriendoRepository arriendoRepository;

    @Autowired
    private MultaRepository multaRepository;

    @PostMapping
    public ResponseEntity<?> arrendar(@RequestParam Long userId, @RequestParam String codigo) {
        System.out.println("🎯 Endpoint ARRIENDO alcanzado - userId=" + userId + ", codigo=" + codigo);

        Book book = bookRepository.findByCodigoAndEstado(codigo, "local");

        if (book == null) {
            return ResponseEntity.badRequest().body("No hay ejemplares book.");
        }

        book.setEstado("arrendado");

        User usuario = userRepository.findById(userId).orElseThrow();

        Arriendo arriendo = new Arriendo();
        arriendo.setUsuario(usuario);
        arriendo.setCodigo(codigo);
        arriendo.setFechaInicio(LocalDate.now());

        bookRepository.save(book);
        arriendoRepository.save(arriendo);

        return ResponseEntity.ok(Map.of("message", "Arriendo registrado con éxito"));
    }

    // ✅ 1. Obtener arriendos vigentes de un usuario con datos del libro
    @GetMapping("/usuario/{id}")
    public List<ArriendoConLibroDTO> obtenerPorUsuario(@PathVariable Long id) {
        User usuario = userRepository.findById(id).orElse(null);
        if (usuario == null) return List.of();

        List<Arriendo> arriendos = arriendoRepository.findByUsuarioAndDevueltoFalse(usuario);

        return arriendos.stream().map(a -> {
            ArriendoConLibroDTO dto = new ArriendoConLibroDTO();
            dto.id = a.getId();
            dto.codigo = a.getCodigo();
            dto.fechaInicio = a.getFechaInicio();
            dto.fechaDevolucion = a.getFechaDevolucion();
            dto.devuelto = a.isDevuelto();
            dto.usuario = a.getUsuario();
            Optional<Book> b = bookRepository.findByCodigo(a.getCodigo());
            b.ifPresent(book -> dto.book = book);
            return dto;
        }).toList();
    }

    // ✅ 2. Devolver un libro
    @PutMapping("/devolver/{codigo}")
    public String devolver(@PathVariable String codigo) {
        List<Arriendo> activos = arriendoRepository.findByCodigoAndDevueltoFalse(codigo);
        if (activos.isEmpty()) return "Error al devolver o ha sido devuelto.";

        Arriendo arriendo = activos.get(0);
        arriendo.setDevuelto(true);
        arriendo.setFechaDevolucion(LocalDate.now());
        arriendoRepository.save(arriendo);

        long dias = java.time.temporal.ChronoUnit.DAYS.between(arriendo.getFechaInicio(), LocalDate.now());
        if (dias > 30) {
            Multa multa = new Multa();
            multa.setUsuario(arriendo.getUsuario());
            multa.setArriendo(arriendo);
            multa.setFecha(LocalDate.now());
            multa.setMonto((dias - 30) * 1000);
            multaRepository.save(multa);
        }

        Optional<Book> bookOpt = bookRepository.findByCodigo(codigo);
        bookOpt.ifPresent(book -> {
            book.setEstado("local");
            bookRepository.save(book);
        });

        String userInfo = arriendo.getUsuario() != null ? arriendo.getUsuario().getEmail() : "desconocido";

        return "Libro devuelto por " + userInfo;
    }
}
