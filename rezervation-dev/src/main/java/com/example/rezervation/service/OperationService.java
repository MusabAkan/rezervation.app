package com.example.rezervation.service;

import com.example.rezervation.domain.Operation;
import com.example.rezervation.dto.OperationDTO;
import com.example.rezervation.repository.OperationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OperationService {

    private final OperationRepository operationRepository;

    public OperationService(OperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    public List<Operation> getAllOperations() {
        return operationRepository.findAll();
    }

    public Optional<Operation> getOperationById(String id) {
        return operationRepository.findById(id);
    }

    public Operation saveOperation(Operation operation) {
        return operationRepository.save(operation);
    }

    public void deleteOperation(String id) {
        operationRepository.deleteById(id);
    }

    // Metot artık doğrudan repository'den gelen DTO listesini döndürüyor.
    public List<OperationDTO> getOperationsByBusinessId(String businessId) {
        return operationRepository.findOperationsByBusinessId(businessId);
    }
}
