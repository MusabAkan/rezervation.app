package com.example.rezervation.service;

import com.example.rezervation.domain.Business;
import com.example.rezervation.repository.BusinessRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {

    private final BusinessRepository businessRepository;

    // Dependency Injection ile BusinessRepository'yi enjekte ediyoruz.
    public BusinessService(BusinessRepository businessRepository) {
        this.businessRepository = businessRepository;
    }

    /**
     * Veritabanındaki tüm işletmeleri döndürür.
     * @return İşletme listesi
     */
    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }

    /**
     * Verilen bir işletmeyi kaydeder.
     * @param business Kaydedilecek işletme nesnesi
     * @return Kaydedilmiş işletme nesnesi
     */
    public Business saveBusiness(Business business) {
        return businessRepository.save(business);
    }
}
