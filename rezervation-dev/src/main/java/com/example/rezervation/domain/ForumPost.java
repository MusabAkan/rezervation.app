package com.example.rezervation.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @Lob
    private String content;

    private LocalDateTime timestamp;

    private int likes;

    // Gerçek bir uygulamada yorumlar ayrı bir entity olabilir.
    // Şimdilik basitlik için yorum sayısını tutuyoruz.
    private int commentCount;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }
}
