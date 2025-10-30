package com.example.rezervation.controller;

import com.example.rezervation.dto.OperationDTO;
import com.example.rezervation.domain.Operation;
import com.example.rezervation.service.OperationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operations")
public class OperationController {

    private final OperationService operationService;

    public OperationController(OperationService operationService) {
        this.operationService = operationService;
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<OperationDTO>> getOperationsByBusinessId(@PathVariable String businessId) {
        List<OperationDTO> operations = operationService.getOperationsByBusinessId(businessId);
        return ResponseEntity.ok(operations);
    }

    @PostMapping
    public ResponseEntity<Operation> createOperation(@RequestBody Operation operation) {
        Operation savedOperation = operationService.saveOperation(operation);
        return ResponseEntity.ok(savedOperation);
    }
}
