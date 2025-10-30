package com.example.rezervation.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CORS ayarlarını WebConfig'den almasını sağlıyoruz.
            .cors(cors -> {})
            // API'lar için CSRF koruması genellikle devre dışı bırakılır.
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // /api/ altındaki tüm isteklere şimdilik izin veriyoruz.
                // Gelecekte buraya daha detaylı yetkilendirme kuralları eklenebilir.
                .requestMatchers("/api/**").permitAll()
                // Diğer tüm isteklere de (örn. H2 konsolu) şimdilik izin ver.
                .anyRequest().permitAll()
            );
        return http.build();
    }
}
