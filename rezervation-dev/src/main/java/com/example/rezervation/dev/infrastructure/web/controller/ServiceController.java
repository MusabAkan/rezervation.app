package com.example.rezervation.dev.infrastructure.web.controller;

import com.example.rezervation.dev.domain.model.Service;
import com.example.rezervation.dev.infrastructure.persistence.InMemoryServiceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend to connect
public class ServiceController {

    private final InMemoryServiceRepository serviceRepository;

    public ServiceController(InMemoryServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping("/{businessId}")
    public List<Service> getServicesByBusinessId(@PathVariable String businessId) {
        return serviceRepository.findByBusinessId(businessId);
    }
}
