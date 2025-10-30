package com.example.rezervation.config;

import com.example.rezervation.domain.*;
import com.example.rezervation.repository.NotificationPreferencesRepository;
import com.example.rezervation.service.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer {

    private final UserService userService;
    private final BusinessService businessService;
    private final OperationService operationService;
    private final ForumService forumService;
    private final NotificationService notificationService;
    private final NotificationPreferencesRepository preferencesRepository;

    public DataInitializer(UserService userService, BusinessService businessService, OperationService operationService, ForumService forumService, NotificationService notificationService, NotificationPreferencesRepository preferencesRepository) {
        this.userService = userService;
        this.businessService = businessService;
        this.operationService = operationService;
        this.forumService = forumService;
        this.notificationService = notificationService;
        this.preferencesRepository = preferencesRepository;
    }

    public void loadInitialData() {
        if (userService.findByEmail("admin@example.com").isPresent()) {
            return; // Veri zaten yüklü
        }
        
        System.out.println("Veritabanı boş, başlangıç verileri yükleniyor...");

        // 1. Kullanıcıları Oluştur
        User admin = createUser("Admin User", "admin@example.com", "password", "admin");
        User owner1 = createUser("Selin Yılmaz", "selin.yilmaz@example.com", "password", "business");
        User owner2 = createUser("Ahmet Kaya", "ahmet.kaya@example.com", "password", "business");
        User customer1 = createUser("Ayşe Demir", "ayse.demir@example.com", "password", "customer");
        User customer2 = createUser("Mehmet Çelik", "mehmet.celik@example.com", "password", "customer");

        // 2. İşletmeleri ve Operasyonları Oluştur
        Business b1 = createBusiness(owner1, "Selin'in Güzellik Salonu", "Modern saç tasarımları, cilt bakımı ve daha fazlası.", "Güzellik & Bakım", List.of("Kuaför", "Cilt Bakımı"), "Lale Sok. No: 12, Beşiktaş", 4.9, 1.5, "$$$");
        createOperation(b1, "Kadın Saç Kesim", "Stilinize uygun modern kesimler.", 800, 60);
        createOperation(b1, "Manikür & Pedikür", "El ve ayaklarınız için komple bakım.", 600, 75);
        createOperation(b1, "Cilt Bakımı", "Profesyonel ürünlerle derinlemesine temizlik.", 1200, 90);
        createOperation(b1, "Kaş Dizayn", "Yüz şeklinize uygun kaş tasarımı.", 250, 20);
        createOperation(b1, "Makyaj", "Özel günleriniz için profesyonel makyaj.", 1500, 60);

        Business b2 = createBusiness(owner2, "Kaya Fitness & Spor", "Geniş ve ferah bir alanda spor yapma imkanı.", "Spor & Sağlık", List.of("Spor Salonu", "Fitness"), "Spor Cad. No: 101, Kadıköy", 4.7, 3.2, "$$");
        createOperation(b2, "Aylık Üyelik", "Tüm alanlara sınırsız erişim.", 2500, 0);
        createOperation(b2, "Personal Trainer (1 Saat)", "Kişiye özel antrenman programı.", 1000, 60);
        createOperation(b2, "Yoga Dersi (Grup)", "Haftada 2 gün, 8 ders.", 1800, 60);
        createOperation(b2, "Pilates Dersi (Özel)", "Reformer pilates aletleriyle birebir ders.", 1500, 50);

        // 3. Forum Gönderilerini Oluştur
        createForumPost(customer1, "Selin'in Güzellik Salonu'nda cilt bakımı yaptırdım, cildim ışıl ışıl oldu! Kesinlikle tavsiye ediyorum.", 2, 25);
        createForumPost(owner1, "Yeni gelen organik cilt bakım ürünlerimizi denediniz mi? #ciltbakımı #güzellik", 1, 18);
        createForumPost(customer2, "Kaya Fitness'ın aylık üyeliği fiyat/performans olarak çok iyi. Ekipmanlar da yeni.", 0, 42);

        // 4. Bildirimleri Oluştur
        createNotification(customer1, "Randevunuz onaylandı: Selin'in Güzellik Salonu, 28.12.2024 15:00", "appointmentConfirmed");
        createNotification(customer1, "Kaya Fitness & Spor'dan yeni mesajınız var.", "newChatMessage");
        createNotification(customer2, "Yeni bir forum gönderisi paylaşıldı.", "info");

        System.out.println("Başlangıç verileri başarıyla yüklendi.");
    }

    private User createUser(String fullName, String email, String password, String type) {
        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(password);
        user.setUserType(type);
        
        NotificationPreferences prefs = new NotificationPreferences();
        prefs.setUser(user);
        user.setNotificationPreferences(prefs);
        
        return userService.registerUser(user);
    }

    private Business createBusiness(User owner, String name, String desc, String cat, List<String> subCats, String address, double rating, double dist, String price) {
        Business b = new Business();
        b.setOwner(owner);
        b.setName(name);
        b.setDescription(desc);
        b.setCategory(cat);
        b.setSubCategories(subCats);
        b.setAddress(address);
        b.setRating(rating);
        b.setDistanceKm(dist);
        b.setPriceLevel(price);
        return businessService.saveBusiness(b);
    }

    private void createOperation(Business business, String name, String desc, double price, int duration) {
        Operation op = new Operation();
        op.setName(name);
        op.setDescription(desc);
        op.setPrice(price);
        op.setDurationInMinutes(duration);
        op.setBusiness(business);
        operationService.saveOperation(op);
    }

    private void createForumPost(User author, String content, int daysAgo, int likes) {
        ForumPost post = new ForumPost();
        post.setAuthor(author);
        post.setContent(content);
        post.setTimestamp(LocalDateTime.now().minusDays(daysAgo));
        post.setLikes(likes);
        forumService.createPost(post);
    }

    private void createNotification(User user, String message, String type) {
        Notification n = new Notification();
        n.setUser(user);
        n.setMessage(message);
        n.setType(type);
        n.setRead(false);
        n.setTimestamp(LocalDateTime.now());
        notificationService.createNotification(n);
    }
}
