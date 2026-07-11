package com.tripnest.tripnestbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "destinations")
@Data
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destinationName;

    private String country;

    private String state;

    private String city;

    @Column(length = 1000)
    private String description;

    private Double estimatedBudget;
}