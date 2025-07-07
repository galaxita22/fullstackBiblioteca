package com.biblioteca.biblioteca_backend.repositories;

import com.biblioteca.biblioteca_backend.models.Arriendo;
import com.biblioteca.biblioteca_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArriendoRepository extends JpaRepository<Arriendo, Long> {
    // Obtiene los arriendos que aún no han sido devueltos por un usuario
    List<Arriendo> findByUsuario(User usuario);//Dame los arriendos de un usuario específico

    Arriendo findByCodigo(String codigo);

    List<Arriendo> findByUsuarioAndDevueltoFalse(User usuario);

    List<Arriendo> findByCodigoAndDevueltoFalse(String codigo);

    long countByDevueltoFalse();
}
