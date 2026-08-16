package com.tripnest.tripnestbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "trips")
@Data
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tripName;

    private String destination;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double budget;

    @Column(length = 1000)
    private String description;

    // Trip owner
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;
}