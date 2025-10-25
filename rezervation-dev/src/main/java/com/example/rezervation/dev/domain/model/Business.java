package com.example.rezervation.dev.domain.model;

import java.util.List;

public class Business {
    private String id;
    private String name;
    private String category;
    private List<String> subs;
    private double rating;
    private String priceLevel;
    private double distanceKm;
    private String phone;
    private String email;
    private String address;
    private int photos;
    private int reviews;
    private String description;
    private List<String> slots;

    // Constructors, Getters, and Setters

    public Business() {}

    public Business(String id, String name, String category, List<String> subs, double rating, String priceLevel, double distanceKm, String phone, String email, String address, int photos, int reviews, String description, List<String> slots) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.subs = subs;
        this.rating = rating;
        this.priceLevel = priceLevel;
        this.distanceKm = distanceKm;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.photos = photos;
        this.reviews = reviews;
        this.description = description;
        this.slots = slots;
    }

    // Getters and Setters for all fields

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getSubs() {
        return subs;
    }

    public void setSubs(List<String> subs) {
        this.subs = subs;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getPriceLevel() {
        return priceLevel;
    }

    public void setPriceLevel(String priceLevel) {
        this.priceLevel = priceLevel;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPhotos() {
        return photos;
    }

    public void setPhotos(int photos) {
        this.photos = photos;
    }

    public int getReviews() {
        return reviews;
    }

    public void setReviews(int reviews) {
        this.reviews = reviews;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getSlots() {
        return slots;
    }

    public void setSlots(List<String> slots) {
        this.slots = slots;
    }
}
