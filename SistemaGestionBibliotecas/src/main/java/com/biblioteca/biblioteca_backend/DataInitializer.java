package com.biblioteca.biblioteca_backend;

import com.biblioteca.biblioteca_backend.models.User;
import com.biblioteca.biblioteca_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        createAdminIfNotExists("admin1", "admin1@admin.cl", "123456");
        createAdminIfNotExists("admin2", "admin2@admin.cl", "123456");
        createAdminIfNotExists("admin3", "admin3@admin.cl", "123456");
    }

    private void createAdminIfNotExists(String name, String email, String password) {
        if (userRepository.findByEmail(email) == null) {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(password);
            user.setRole("admin");
            userRepository.save(user);
        }
    }
}