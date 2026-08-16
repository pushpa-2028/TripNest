package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Trip;
import com.tripnest.tripnestbackend.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {

    private final TripRepository repository;

    public TripService(TripRepository repository) {
        this.repository = repository;
    }

    // =====================================
    // CREATE TRIP
    // =====================================

    public Trip saveTrip(Trip trip) {
        return repository.save(trip);
    }

    // =====================================
    // GET ALL TRIPS
    // =====================================

    public List<Trip> getAllTrips() {
        return repository.findAll();
    }

    // =====================================
    // GET TRIP BY ID
    // =====================================

    public Trip getTripById(Long id) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Trip not found"
                        )
                );
    }

    // =====================================
    // UPDATE TRIP
    // =====================================

    public Trip updateTrip(
            Long id,
            Trip updatedTrip) {

        Trip trip = repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Trip not found"
                        )
                );

        trip.setTripName(
                updatedTrip.getTripName()
        );

        trip.setDestination(
                updatedTrip.getDestination()
        );

        trip.setStartDate(
                updatedTrip.getStartDate()
        );

        trip.setEndDate(
                updatedTrip.getEndDate()
        );

        trip.setBudget(
                updatedTrip.getBudget()
        );

        trip.setDescription(
                updatedTrip.getDescription()
        );

        return repository.save(trip);
    }

    // =====================================
    // DELETE TRIP
    // =====================================

    public void deleteTrip(Long id) {
        repository.deleteById(id);
    }
}