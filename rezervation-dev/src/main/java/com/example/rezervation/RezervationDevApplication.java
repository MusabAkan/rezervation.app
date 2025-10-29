package com.example.rezervation;

import com.example.rezervation.config.DataInitializer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication // Kök pakette olduğu için ek tarama ayarları gerekmez
public class RezervationDevApplication {

    public static void main(String[] args) {
        SpringApplication.run(RezervationDevApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(DataInitializer dataInitializer) {
        return args -> {
            dataInitializer.loadInitialData();
        };
    }
}
