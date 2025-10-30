package com.example.rezervation.repository;

import com.example.rezervation.domain.Operation;
import com.example.rezervation.dto.OperationDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OperationRepository extends JpaRepository<Operation, String> {

    /**
     * Belirli bir işletme ID'sine ait tüm hizmetleri doğrudan DTO olarak bulur.
     * Bu, tembel yükleme (lazy loading) ve serileştirme sorunlarını kökünden çözer.
     * @param businessId İşletme ID'si
     * @return OperationDTO listesi
     */
    @Query("SELECT new com.example.rezervation.dto.OperationDTO(o.id, o.name, o.description, o.price, o.durationInMinutes) FROM Operation o WHERE o.business.id = :businessId")
    List<OperationDTO> findOperationsByBusinessId(@Param("businessId") String businessId);

}
