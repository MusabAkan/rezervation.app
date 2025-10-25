package com.example.rezervation.dev.application.usecase;

import com.example.rezervation.dev.domain.model.User;
import com.example.rezervation.dev.domain.port.UserRepository;

import java.util.List;
import java.util.Optional;

public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAllUsers();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findUserById(id);
    }

    public User createUser(User user) {
        // In a real application, you might have business logic here
        // for example, checking if the email is already taken
        return userRepository.saveUser(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteUser(id);
    }
}
