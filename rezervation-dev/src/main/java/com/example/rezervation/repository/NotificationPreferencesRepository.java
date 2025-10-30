package com.example.rezervation.repository;

import com.example.rezervation.domain.NotificationPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationPreferencesRepository extends JpaRepository<NotificationPreferences, String> {
}
