package com.example.rezervation.dev.domain.model;

public class Service {
    private String id;
    private String name;
    private double price;
    private String unit;
    private String status;
    private String icon;
    private String currency;
    private boolean active;
    private boolean isRemote;
    private String subCategory;
    private Double oldPrice;

    // Constructors, Getters, and Setters

    public Service() {}

    public Service(String id, String name, double price, String unit, String status, String icon, String currency, boolean active, boolean isRemote, String subCategory, Double oldPrice) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.status = status;
        this.icon = icon;
        this.currency = currency;
        this.active = active;
        this.isRemote = isRemote;
        this.subCategory = subCategory;
        this.oldPrice = oldPrice;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isRemote() {
        return isRemote;
    }

    public void setRemote(boolean remote) {
        isRemote = remote;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public Double getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(Double oldPrice) {
        this.oldPrice = oldPrice;
    }
}
