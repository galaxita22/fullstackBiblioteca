package com.biblioteca.biblioteca_backend.config;  // Ajusta el package si es necesario

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsGlobalConfiguration {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*");    // acepta cualquier origen
        config.addAllowedHeader("*");            // acepta cualquier header
        config.addAllowedMethod("*");            // acepta cualquier método (GET, POST, PUT, DELETE, OPTIONS)
        config.setAllowCredentials(true);        // permite cookies/sesiones

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
