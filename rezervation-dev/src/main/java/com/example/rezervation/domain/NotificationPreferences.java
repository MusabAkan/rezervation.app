package com.example.rezervation.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class NotificationPreferences {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // Rezervasyon Uyarıları
    private boolean reservationAlertsEmail = true;
    private boolean reservationAlertsSms = false;

    // Haber ve Güncellemeler
    private boolean newsUpdatesEmail = true;
    private boolean newsUpdatesWhatsapp = false;

    // Takip Edilen İşletmeler
    private boolean followedBusinessEmail = true;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isReservationAlertsEmail() {
        return reservationAlertsEmail;
    }

    public void setReservationAlertsEmail(boolean reservationAlertsEmail) {
        this.reservationAlertsEmail = reservationAlertsEmail;
    }

    public boolean isReservationAlertsSms() {
        return reservationAlertsSms;
    }

    public void setReservationAlertsSms(boolean reservationAlertsSms) {
        this.reservationAlertsSms = reservationAlertsSms;
    }

    public boolean isNewsUpdatesEmail() {
        return newsUpdatesEmail;
    }

    public void setNewsUpdatesEmail(boolean newsUpdatesEmail) {
        this.newsUpdatesEmail = newsUpdatesEmail;
    }

    public boolean isNewsUpdatesWhatsapp() {
        return newsUpdatesWhatsapp;
    }

    public void setNewsUpdatesWhatsapp(boolean newsUpdatesWhatsapp) {
        this.newsUpdatesWhatsapp = newsUpdatesWhatsapp;
    }

    public boolean isFollowedBusinessEmail() {
        return followedBusinessEmail;
    }

    public void setFollowedBusinessEmail(boolean followedBusinessEmail) {
        this.followedBusinessEmail = followedBusinessEmail;
    }
}
