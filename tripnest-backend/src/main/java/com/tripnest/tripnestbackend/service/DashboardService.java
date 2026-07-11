package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.dto.DashboardResponse;
import com.tripnest.tripnestbackend.entity.Trip;
import com.tripnest.tripnestbackend.repository.DestinationRepository;
import com.tripnest.tripnestbackend.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardService {

    private final TripRepository tripRepository;
    private final DestinationRepository destinationRepository;

    public DashboardService(TripRepository tripRepository,
                            DestinationRepository destinationRepository) {

        this.tripRepository = tripRepository;
        this.destinationRepository = destinationRepository;
    }

    public DashboardResponse getDashboardData() {

        DashboardResponse response = new DashboardResponse();

        // Total Trips
        response.setTotalTrips(tripRepository.count());

        // Total Destinations
        response.setTotalDestinations(destinationRepository.count());

        // Total Budget
        List<Trip> trips = tripRepository.findAll();

        double totalBudget = 0;

        for (Trip trip : trips) {

            if (trip.getBudget() != null) {
                totalBudget += trip.getBudget();
            }

        }

        response.setTotalBudget(totalBudget);

        // Upcoming Trips

        long upcoming = trips.stream()
                .filter(t -> t.getStartDate() != null)
                .filter(t -> t.getStartDate().isAfter(LocalDate.now()))
                .count();

        response.setUpcomingTrips(upcoming);

        return response;

    }

}