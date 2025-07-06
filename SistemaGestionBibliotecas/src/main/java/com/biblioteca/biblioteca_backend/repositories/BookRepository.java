package com.biblioteca.biblioteca_backend.repositories;

import com.biblioteca.biblioteca_backend.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrGenreContainingIgnoreCase(
            String title, String author, String genre, Pageable pageable
    );
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCaseOrGenreContainingIgnoreCase(
            String title, String author, String genre);
    long countBookByAuthorAndTitle(String author, String title);

    boolean existsByTitleAndAuthor(String title, String author);

    Optional<Book> findByCodigo(String codigo);

    Book findByCodigoAndEstado(String codigo, String estado);
}
