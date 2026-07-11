package com.tripnest.tripnestbackend.dto;

import lombok.Data;

@Data
public class DashboardResponse {

    private Long totalTrips;

    private Long totalDestinations;

    private Double totalBudget;

    private Long upcomingTrips;

}