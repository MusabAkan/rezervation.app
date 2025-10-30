package com.example.rezervation.service;

import com.example.rezervation.domain.Notification;
import com.example.rezervation.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
}
