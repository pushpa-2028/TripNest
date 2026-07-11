package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.Trip;
import com.tripnest.tripnestbackend.service.TripService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    private final TripService service;

    public TripController(TripService service) {
        this.service = service;
    }

    // Create Trip
    @PostMapping
    public Trip createTrip(@RequestBody Trip trip) {

        System.out.println("POST API HIT");

        return service.saveTrip(trip);
    }

    // Get All Trips
    @GetMapping
    public List<Trip> getTrips() {
        return service.getAllTrips();
    }

    // Get Trip By ID
    @GetMapping("/{id}")
    public Trip getTripById(@PathVariable Long id) {
        return service.getTripById(id);
    }

    // Update Trip
    @PutMapping("/{id}")
    public Trip updateTrip(@PathVariable Long id,
                           @RequestBody Trip trip) {
        return service.updateTrip(id, trip);
    }

    // Delete Trip
    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable Long id) {
        service.deleteTrip(id);
    }
}