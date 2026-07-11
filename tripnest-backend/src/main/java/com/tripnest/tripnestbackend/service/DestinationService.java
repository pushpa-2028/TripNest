package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Destination;
import com.tripnest.tripnestbackend.repository.DestinationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationService {

    private final DestinationRepository repository;

    public DestinationService(DestinationRepository repository) {
        this.repository = repository;
    }

    // Create Destination
    public Destination saveDestination(Destination destination) {
        return repository.save(destination);
    }

    // Get All Destinations
    public List<Destination> getAllDestinations() {
        return repository.findAll();
    }

    // Get Destination By ID
    public Destination getDestinationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));
    }

    // Update Destination
    public Destination updateDestination(Long id, Destination updatedDestination) {

        Destination destination = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));

        destination.setDestinationName(updatedDestination.getDestinationName());
        destination.setCountry(updatedDestination.getCountry());
        destination.setState(updatedDestination.getState());
        destination.setCity(updatedDestination.getCity());
        destination.setDescription(updatedDestination.getDescription());
        destination.setEstimatedBudget(updatedDestination.getEstimatedBudget());

        return repository.save(destination);
    }

    // Delete Destination
    public void deleteDestination(Long id) {
        repository.deleteById(id);
    }
}