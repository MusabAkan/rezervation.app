package com.example.rezervation.service;

import com.example.rezervation.domain.User;
import com.example.rezervation.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Yeni bir kullanıcı kaydeder.
     * @param user Kaydedilecek kullanıcı nesnesi.
     * @return Kaydedilmiş kullanıcı nesnesi.
     * @throws IllegalStateException E-posta adresi zaten kullanımdaysa.
     */
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalStateException("Bu e-posta adresi zaten kullanılıyor: " + user.getEmail());
        }
        // Gerçek bir uygulamada burada şifre şifrelenmelidir.
        // user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * E-posta adresine göre bir kullanıcı bulur.
     * @param email Aranacak e-posta adresi.
     * @return Kullanıcıyı içeren bir Optional nesnesi.
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
