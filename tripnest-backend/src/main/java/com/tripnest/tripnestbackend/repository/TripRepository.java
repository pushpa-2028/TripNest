package com.tripnest.tripnestbackend.repository;

import com.tripnest.tripnestbackend.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, Long> {

}