package com.tripnest.tripnestbackend.repository;

import com.tripnest.tripnestbackend.entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    List<Itinerary> findByTripId(Long tripId);

}