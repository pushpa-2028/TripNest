package com.tripnest.tripnestbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "itineraries")
@Data
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tripId;

    private Integer dayNumber;

    private String activity;

    private String location;

    private String activityTime;

    @Column(length = 1000)
    private String notes;
}