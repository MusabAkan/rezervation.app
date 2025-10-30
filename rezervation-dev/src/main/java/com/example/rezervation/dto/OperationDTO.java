package com.example.rezervation.dto;

// Data Transfer Object for Operation
// Bu sınıf, Operation entity'sinin frontend'e gönderilecek olan sadeleştirilmiş bir versiyonudur.
public class OperationDTO {

    private String id;
    private String name;
    private String description;
    private double price;
    private int durationInMinutes;

    public OperationDTO(String id, String name, String description, double price, int durationInMinutes) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.durationInMinutes = durationInMinutes;
    }

    // Getters and Setters

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getDurationInMinutes() {
        return durationInMinutes;
    }

    public void setDurationInMinutes(int durationInMinutes) {
        this.durationInMinutes = durationInMinutes;
    }
}
