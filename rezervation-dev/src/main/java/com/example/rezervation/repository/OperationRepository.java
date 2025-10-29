package com.example.rezervation.repository;

import com.example.rezervation.domain.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperationRepository extends JpaRepository<Operation, String> {
    /**
     * Belirli bir işletme ID'sine ait tüm hizmetleri bulur.
     * @param businessId İşletme ID'si
     * @return Hizmet listesi
     */
    List<Operation> findByBusinessId(String businessId);
}
