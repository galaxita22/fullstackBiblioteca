package com.biblioteca.biblioteca_backend.controllers;

import com.biblioteca.biblioteca_backend.models.Book;
import com.biblioteca.biblioteca_backend.models.LibroDTO;
import com.biblioteca.biblioteca_backend.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.text.Normalizer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    private String normalizar(String texto) {
        return Normalizer.normalize(texto, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase();
    }

    // Obtener todos los libros
    @GetMapping("/all")
    public List<Book> getAllBooks() {
        System.out.println("📚 Obteniendo todos los libros..."); // debug
        return bookRepository.findAll();
    }

    @GetMapping("/buscar")
    public List<Book> buscar(@RequestParam String termino) {
        System.out.println("🔍 Búsqueda recibida: " + termino); // debug
        String terminoNormalizado = normalizar(termino);
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrGenreContainingIgnoreCase(
                terminoNormalizado, terminoNormalizado, terminoNormalizado
        );
    }

    @PostMapping("/agregar")
    public ResponseEntity<Map<String, String>> agregar(@RequestBody LibroDTO dto) {
        Map<String, String> respuesta = new HashMap<>();
        String codigo = generarCodigoBaseDesdeTitulo(dto.title);
        boolean Existente = false;
        if (bookRepository.existsByTitleAndAuthor(dto.title, dto.author)) {
            Existente = true;
        }
        for (int i = 0; i < dto.cantidadEjemplares; i++) {
            String codigoClone = codigo;
            if (Existente) {
                long cantidad = bookRepository.countBookByAuthorAndTitle(dto.author, dto.title);
                codigoClone = codigoClone + "-" + (cantidad + 1);
            }
            System.out.println(codigoClone); // debug
            Book nuevo = new Book();
            nuevo.setCodigo(codigoClone);
            nuevo.setTitle(dto.title);
            nuevo.setAuthor(dto.author);
            nuevo.setGenre(dto.genre);
            nuevo.setDescription(dto.description);
            nuevo.setImage(dto.imageUrl);
            nuevo.setEstado("local");

            bookRepository.save(nuevo);
            if (dto.cantidadEjemplares > 1) Existente = true;
        }

        respuesta.put("mensaje", "Libro guardado exitosamente.");
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/code/{codigo}")
    public Optional<Book> getLibroPorCodigo(@PathVariable String codigo) {
        return bookRepository.findByCodigo(codigo);
    }

    @PutMapping("/code/{codigo}/estado")
    public String cambiarEstado(@PathVariable String codigo, @RequestBody String nuevoEstado) {
        Optional<Book> bookOptional = bookRepository.findByCodigo(codigo);

        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            book.setEstado(nuevoEstado);
            bookRepository.save(book);
            return "Estado actualizado correctamente.";
        }

        return "Ejemplar no encontrado.";
    }

    @GetMapping("/disponible/{codigo}")
    public boolean estaDisponible(@PathVariable String codigo) {
        Optional<Book> bookOptional = bookRepository.findByCodigo(codigo);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            return book.getEstado().equals("local");
        }

        return false;
    }

    private String generarCodigoBaseDesdeTitulo(String titulo) {
        if (titulo == null || titulo.isEmpty()) return "LIBRO";

        // 1. Normalizar para quitar tildes
        String tituloNormalizado = Normalizer.normalize(titulo, Normalizer.Form.NFD).replaceAll("\\p{M}", ""); // Elimina acentos

        // 2. Eliminar caracteres especiales (solo letras y números)
        tituloNormalizado = tituloNormalizado.replaceAll("[^a-zA-Z0-9\\s]", "");

        String[] palabras = tituloNormalizado.split("\\s+");
        StringBuilder codigo = new StringBuilder();

        for (String palabra : palabras) {
            if (palabra.length() >= 2) {
                codigo.append(palabra.substring(0, 2).toUpperCase());
            } else {
                codigo.append(palabra.toUpperCase());
            }
        }

        return codigo.toString();
    }
}
