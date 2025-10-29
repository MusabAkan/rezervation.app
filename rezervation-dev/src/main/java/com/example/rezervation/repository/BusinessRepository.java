package com.example.rezervation.repository;

import com.example.rezervation.domain.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRepository extends JpaRepository<Business, String> {
    // Spring Data JPA, bu arayüz için otomatik olarak temel CRUD (Create, Read, Update, Delete)
    // metotlarını (findAll, findById, save, deleteById vb.) oluşturacaktır.
    // Gelecekte buraya özel sorgu metotları ekleyebiliriz.
    // Örneğin: List<Business> findByCategory(String category);
}
