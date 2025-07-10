package com.biblioteca.biblioteca_backend.controllers;

import com.biblioteca.biblioteca_backend.models.User;
import com.biblioteca.biblioteca_backend.models.UserLoginResponseDTO;
import com.biblioteca.biblioteca_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (!user.getEmail().matches("^[^\\s@]+@[^\\s@]+\\.(cl|com|es)$")) {
            return "Formato de correo no valido";
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "El correo ya está registrado";
        }
        user.setRole("client"); //rol cliente por defecto
        userRepository.save(user);
        return "Usuario registrado exitosamente";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("id", user.getId());
            respuesta.put("email", user.getEmail());
            respuesta.put("role", user.getRole());

            return ResponseEntity.ok(new UserLoginResponseDTO(
                    user.getId(),
                    user.getEmail(),
                    user.getRole()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }



}
// Este controlador maneja las solicitudes de registro y autenticación de usuarios.