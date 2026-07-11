package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.Destination;
import com.tripnest.tripnestbackend.service.DestinationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "http://localhost:5173")
public class DestinationController {

    private final DestinationService service;

    public DestinationController(DestinationService service) {
        this.service = service;
    }

    // Create Destination
    @PostMapping
    public Destination createDestination(@RequestBody Destination destination) {
        return service.saveDestination(destination);
    }

    // Get All Destinations
    @GetMapping
    public List<Destination> getAllDestinations() {
        return service.getAllDestinations();
    }

    // Get Destination By ID
    @GetMapping("/{id}")
    public Destination getDestinationById(@PathVariable Long id) {
        return service.getDestinationById(id);
    }

    // Update Destination
    @PutMapping("/{id}")
    public Destination updateDestination(@PathVariable Long id,
                                         @RequestBody Destination destination) {
        return service.updateDestination(id, destination);
    }

    // Delete Destination
    @DeleteMapping("/{id}")
    public void deleteDestination(@PathVariable Long id) {
        service.deleteDestination(id);
    }
}