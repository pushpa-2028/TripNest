package com.tripnest.tripnestbackend.repository;

import com.tripnest.tripnestbackend.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    // Find trips starting on a specific date
    List<Trip> findByStartDate(LocalDate startDate);
}