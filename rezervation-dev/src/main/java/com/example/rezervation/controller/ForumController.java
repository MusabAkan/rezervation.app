package com.example.rezervation.controller;

import com.example.rezervation.domain.ForumPost;
import com.example.rezervation.service.ForumService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forum")
// @CrossOrigin kaldırıldı, artık WebConfig'den yönetiliyor
public class ForumController {

    private final ForumService forumService;

    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    @GetMapping
    public ResponseEntity<List<ForumPost>> getAllPosts() {
        return ResponseEntity.ok(forumService.getAllPosts());
    }

    @PostMapping
    public ResponseEntity<ForumPost> createPost(@RequestBody ForumPost post) {
        return ResponseEntity.ok(forumService.createPost(post));
    }
}
