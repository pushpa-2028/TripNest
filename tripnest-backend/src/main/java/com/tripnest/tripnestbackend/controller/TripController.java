package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.Trip;
import com.tripnest.tripnestbackend.entity.User;
import com.tripnest.tripnestbackend.repository.UserRepository;
import com.tripnest.tripnestbackend.service.TripService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    private final TripService service;
    private final UserRepository userRepository;

    public TripController(
            TripService service,
            UserRepository userRepository) {

        this.service = service;
        this.userRepository = userRepository;
    }

    // =====================================
    // CREATE TRIP
    // =====================================

    @PostMapping
    public Trip createTrip(
            @RequestBody Trip trip,
            Authentication authentication) {

        System.out.println("POST API HIT");

        String email = authentication.getName();

        System.out.println(
                "Logged-in user email: " + email
        );

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        trip.setUser(user);

        System.out.println(
                "Trip assigned to user ID: "
                        + user.getId()
        );

        return service.saveTrip(trip);
    }

    // =====================================
    // GET ALL TRIPS
    // =====================================

    @GetMapping
    public List<Trip> getTrips() {
        return service.getAllTrips();
    }

    // =====================================
    // GET TRIP BY ID
    // =====================================

    @GetMapping("/{id}")
    public Trip getTripById(
            @PathVariable Long id) {

        return service.getTripById(id);
    }

    // =====================================
    // UPDATE TRIP
    // =====================================

    @PutMapping("/{id}")
    public Trip updateTrip(
            @PathVariable Long id,
            @RequestBody Trip trip) {

        return service.updateTrip(id, trip);
    }

    // =====================================
    // DELETE TRIP
    // =====================================

    @DeleteMapping("/{id}")
    public void deleteTrip(
            @PathVariable Long id) {

        service.deleteTrip(id);
    }
}