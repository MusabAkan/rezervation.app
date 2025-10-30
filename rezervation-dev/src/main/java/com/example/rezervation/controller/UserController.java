package com.example.rezervation.controller;

import com.example.rezervation.domain.User;
import com.example.rezervation.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin kaldırıldı, artık WebConfig'den yönetiliyor
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        return userService.findByEmail(email)
                .map(user -> {
                    if (user.getPassword().equals(password)) {
                        return new ResponseEntity<>(user, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>(Map.of("message", "Yanlış şifre."), HttpStatus.UNAUTHORIZED);
                    }
                })
                .orElseGet(() -> new ResponseEntity<>(Map.of("message", "Kullanıcı bulunamadı."), HttpStatus.NOT_FOUND));
    }
}
