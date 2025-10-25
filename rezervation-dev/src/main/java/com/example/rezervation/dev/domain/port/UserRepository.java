package com.example.rezervation.dev.domain.port;

import com.example.rezervation.dev.domain.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    List<User> findAllUsers();
    Optional<User> findUserById(String id);
    User saveUser(User user);
    void deleteUser(String id);
}
