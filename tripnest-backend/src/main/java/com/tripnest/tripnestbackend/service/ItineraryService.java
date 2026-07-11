package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Itinerary;
import com.tripnest.tripnestbackend.repository.ItineraryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItineraryService {

    private final ItineraryRepository repository;

    public ItineraryService(ItineraryRepository repository) {
        this.repository = repository;
    }

    // Create Itinerary
    public Itinerary saveItinerary(Itinerary itinerary) {
        return repository.save(itinerary);
    }

    // Get All Itineraries
    public List<Itinerary> getAllItineraries() {
        return repository.findAll();
    }

    // Get Itineraries By Trip ID
    public List<Itinerary> getItinerariesByTripId(Long tripId) {
        return repository.findByTripId(tripId);
    }

    // Get Itinerary By ID
    public Itinerary getItineraryById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));
    }

    // Update Itinerary
    public Itinerary updateItinerary(Long id, Itinerary updatedItinerary) {

        Itinerary itinerary = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));

        itinerary.setTripId(updatedItinerary.getTripId());
        itinerary.setDayNumber(updatedItinerary.getDayNumber());
        itinerary.setActivity(updatedItinerary.getActivity());
        itinerary.setLocation(updatedItinerary.getLocation());
        itinerary.setActivityTime(updatedItinerary.getActivityTime());
        itinerary.setNotes(updatedItinerary.getNotes());

        return repository.save(itinerary);
    }

    // Delete Itinerary
    public void deleteItinerary(Long id) {
        repository.deleteById(id);
    }
}