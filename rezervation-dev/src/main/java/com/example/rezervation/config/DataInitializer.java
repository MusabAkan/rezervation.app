package com.example.rezervation.config;

import com.example.rezervation.domain.Business;
import com.example.rezervation.domain.Operation;
import com.example.rezervation.service.BusinessService;
import com.example.rezervation.service.OperationService;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final BusinessService businessService;
    private final OperationService operationService;

    public DataInitializer(BusinessService businessService, OperationService operationService) {
        this.businessService = businessService;
        this.operationService = operationService;
    }

    public void loadInitialData() {
        if (businessService.getAllBusinesses().isEmpty()) {
            System.out.println("Veritabanı boş, başlangıç verileri yükleniyor...");

            Business b1 = new Business();
            b1.setName("Barber Shop Deluxe");
            b1.setDescription("Klasik erkek saç kesimi ve sakal tıraşı.");
            b1.setCategory("Güzellik & Bakım");
            b1.setAddress("123 Ana Cadde, Şehir");
            b1.setRating(4.8);
            b1.setDistanceKm(1.2);
            b1.setPriceLevel("$$");
            businessService.saveBusiness(b1);

            Operation op1 = new Operation();
            op1.setName("Saç Kesimi");
            op1.setPrice(150);
            op1.setDurationInMinutes(30);
            op1.setBusiness(b1);
            operationService.saveOperation(op1);

            Operation op2 = new Operation();
            op2.setName("Sakal Tıraşı");
            op2.setPrice(80);
            op2.setDurationInMinutes(20);
            op2.setBusiness(b1);
            operationService.saveOperation(op2);

            System.out.println("Başlangıç verileri başarıyla yüklendi.");
        }
    }
}
