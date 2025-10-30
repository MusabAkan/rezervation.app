package com.example.rezervation.service;

import com.example.rezervation.domain.ForumPost;
import com.example.rezervation.repository.ForumPostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumService {

    private final ForumPostRepository forumPostRepository;

    public ForumService(ForumPostRepository forumPostRepository) {
        this.forumPostRepository = forumPostRepository;
    }

    public List<ForumPost> getAllPosts() {
        return forumPostRepository.findAll();
    }

    public ForumPost createPost(ForumPost post) {
        return forumPostRepository.save(post);
    }
}
