package com.example.rezervation.dev.infrastructure.persistence;

import com.example.rezervation.dev.domain.model.User;
import com.example.rezervation.dev.domain.port.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Repository
public class InMemoryUserRepository implements UserRepository {

    private final ConcurrentMap<String, User> users = new ConcurrentHashMap<>();

    public InMemoryUserRepository() {
        // Initialize with some mock data
        User user1 = new User("1", "John Doe", "john.doe@example.com");
        User user2 = new User("2", "Jane Smith", "jane.smith@example.com");
        users.put(user1.getId(), user1);
        users.put(user2.getId(), user2);
    }

    @Override
    public List<User> findAllUsers() {
        return new ArrayList<>(users.values());
    }

    @Override
    public Optional<User> findUserById(String id) {
        return Optional.ofNullable(users.get(id));
    }

    @Override
    public User saveUser(User user) {
        // Simple logic to generate an ID if it's not present
        if (user.getId() == null || user.getId().isEmpty()) {
            user.setId(String.valueOf(System.currentTimeMillis()));
        }
        users.put(user.getId(), user);
        return user;
    }

    @Override
    public void deleteUser(String id) {
        users.remove(id);
    }
}
