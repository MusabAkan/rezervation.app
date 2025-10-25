package com.example.rezervation.dev.infrastructure.persistence;

import com.example.rezervation.dev.domain.model.Service;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryServiceRepository {

    private final Map<String, List<Service>> servicesByBusiness = new ConcurrentHashMap<>();

    public InMemoryServiceRepository() {
        servicesByBusiness.put("b1", Arrays.asList(
                new Service("s4", "Periyodik Bakım (Yağ + Filtreler)", 2500, "Adet", "normal", "Wrench", "₺", true, false, "Motor Ustası", null),
                new Service("s5", "Fren Balatası Değişimi (Ön)", 1800, "Adet", "normal", "Car", "₺", true, false, "Fren & Balata", null),
                new Service("s6", "Şanzıman Yağı Değişimi", 3500, "Adet", "yeni", "Package", "₺", true, false, "Şanzıman", null),
                new Service("s7", "Diagnostik Arıza Tespiti", 750, "Saat", "normal", "Search", "₺", true, true, "Elektrik", null),
                new Service("s10", "Lastik Değişimi", 500, "Adet", "normal", "Car", "₺", true, false, "Lastik", null),
                new Service("s11", "Far Temizliği", 600, "Adet", "indirim", "Sparkles", "₺", true, false, "Kaporta", 750.0),
                new Service("s12", "Pasta Cila", 2000, "Adet", "normal", "Award", "₺", false, false, "Kaporta", null)
        ));
        servicesByBusiness.put("b2", Arrays.asList(
                new Service("s1", "Saç Kesimi", 400, "Adet", "zam", "User", "₺", true, false, "Saç", 350.0),
                new Service("s2", "Sakal Tıraşı", 250, "Adet", "indirim", "User", "₺", true, false, "Sakal", 300.0),
                new Service("s3", "Saç + Sakal", 600, "Adet", "normal", "User", "₺", true, false, "Saç", null)
        ));
        servicesByBusiness.put("b3", Arrays.asList(
                new Service("s8", "Diş Taşı Temizliği", 1500, "Adet", "normal", "Sparkles", "₺", true, false, null, null),
                new Service("s9", "Beyazlatma", 4000, "Adet", "yeni", "Award", "₺", true, false, null, null)
        ));
        servicesByBusiness.put("b4", Arrays.asList());
    }

    public List<Service> findByBusinessId(String businessId) {
        return servicesByBusiness.getOrDefault(businessId, Arrays.asList());
    }
}
