package com.example.rezervation.dev.infrastructure.persistence;

import com.example.rezervation.dev.domain.model.Business;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class InMemoryBusinessRepository {

    private final List<Business> businesses = new ArrayList<>();

    public InMemoryBusinessRepository() {
        // Initialize with mock data from the frontend prototype
        businesses.add(new Business("b1", "Usta Ali Oto", "auto", Arrays.asList("Motor Ustası", "Elektrik"), 4.7, "$$", 2.4, "+90 555 000 0001", "iletisim@ustaalioto.com", "İstoç Sanayi 5. Blok No:12, İstanbul", 12, 128, "Motor, elektrik arızaları ve periyodik bakımda uzman ekip.", Arrays.asList("09:30", "10:00", "11:30", "14:00", "16:30")));
        businesses.add(new Business("b2", "Mavi Berber", "barber", Arrays.asList("Saç", "Sakal"), 4.4, "$", 1.1, "+90 555 000 0002", "musteri@maviberber.com", "Bağdat Cad. No:45, İstanbul", 34, 342, "Hızlı randevu, modern kesimler, steril ortam.", Arrays.asList("09:00", "09:30", "13:00", "15:00")));
        businesses.add(new Business("b3", "DentCare Ağız ve Diş", "dent", Arrays.asList("Dolgu", "Ortodonti"), 4.9, "$$$", 5.8, "+90 555 000 0003", "info@dentcare.com", "Levent Mah. Çelik Sk. No:2, İstanbul", 18, 512, "Güler yüzlü ekip, gelişmiş görüntüleme ve tedavi.", Arrays.asList("10:00", "11:00", "14:30", "17:30")));
        businesses.add(new Business("b4", "ArchDesign Mimarlık", "arch", Arrays.asList("İç Mimari"), 5.0, "$$$", 8.2, "+90 555 000 0004", "proje@archdesign.com", "Maslak No:1, İstanbul", 55, 98, "Modern ve fonksiyonel yaşam alanları tasarlıyoruz.", Arrays.asList("10:00", "14:00")));
    }

    public List<Business> findAll() {
        return businesses;
    }
}
