package com.example.rezervation.dev.infrastructure.config;

import com.example.rezervation.dev.application.usecase.UserService;
import com.example.rezervation.dev.domain.port.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public UserService userService(UserRepository userRepository) {
        return new UserService(userRepository);
    }
}