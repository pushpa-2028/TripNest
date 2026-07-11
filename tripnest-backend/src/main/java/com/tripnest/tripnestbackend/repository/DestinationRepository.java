package com.tripnest.tripnestbackend.repository;

import com.tripnest.tripnestbackend.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DestinationRepository extends JpaRepository<Destination, Long> {

}