package com.example.rezervation.controller;

import com.example.rezervation.domain.Operation;
import com.example.rezervation.service.OperationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operations") // Endpoint yolu da /operations olarak güncellendi
@CrossOrigin(origins = "*")
public class OperationController {

    private final OperationService operationService;

    public OperationController(OperationService operationService) {
        this.operationService = operationService;
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<Operation>> getOperationsByBusinessId(@PathVariable String businessId) {
        // Metot adı düzeltildi
        List<Operation> operations = operationService.getOperationsByBusinessId(businessId);
        return ResponseEntity.ok(operations);
    }

    @PostMapping
    public ResponseEntity<Operation> createOperation(@RequestBody Operation operation) {
        // Metot adı düzeltildi
        Operation savedOperation = operationService.saveOperation(operation);
        return ResponseEntity.ok(savedOperation);
    }
}
