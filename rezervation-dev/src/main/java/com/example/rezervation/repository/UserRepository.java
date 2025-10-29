package com.example.rezervation.repository;

import com.example.rezervation.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // E-posta ile kullanıcı bulmak için özel bir metot ekliyoruz.
    Optional<User> findByEmail(String email);
}
