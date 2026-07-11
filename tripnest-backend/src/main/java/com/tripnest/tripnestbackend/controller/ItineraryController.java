package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.Itinerary;
import com.tripnest.tripnestbackend.service.ItineraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
@CrossOrigin(origins = "http://localhost:5173")
public class ItineraryController {

    private final ItineraryService service;

    public ItineraryController(ItineraryService service) {
        this.service = service;
    }

    // Create Itinerary
    @PostMapping
    public Itinerary createItinerary(@RequestBody Itinerary itinerary) {
        return service.saveItinerary(itinerary);
    }

    // Get All Itineraries
    @GetMapping
    public List<Itinerary> getAllItineraries() {
        return service.getAllItineraries();
    }

    // Get Itineraries By Trip ID
    @GetMapping("/trip/{tripId}")
    public List<Itinerary> getItinerariesByTripId(@PathVariable Long tripId) {
        return service.getItinerariesByTripId(tripId);
    }

    // Get Itinerary By ID
    @GetMapping("/{id}")
    public Itinerary getItineraryById(@PathVariable Long id) {
        return service.getItineraryById(id);
    }

    // Update Itinerary
    @PutMapping("/{id}")
    public Itinerary updateItinerary(@PathVariable Long id,
                                     @RequestBody Itinerary itinerary) {
        return service.updateItinerary(id, itinerary);
    }

    // Delete Itinerary
    @DeleteMapping("/{id}")
    public void deleteItinerary(@PathVariable Long id) {
        service.deleteItinerary(id);
    }
}