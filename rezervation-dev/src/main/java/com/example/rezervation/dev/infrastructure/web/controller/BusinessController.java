package com.example.rezervation.dev.infrastructure.web.controller;

import com.example.rezervation.dev.domain.model.Business;
import com.example.rezervation.dev.infrastructure.persistence.InMemoryBusinessRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/businesses")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to connect
public class BusinessController {

    private final InMemoryBusinessRepository businessRepository;

    public BusinessController(InMemoryBusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    @GetMapping
    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }
}
