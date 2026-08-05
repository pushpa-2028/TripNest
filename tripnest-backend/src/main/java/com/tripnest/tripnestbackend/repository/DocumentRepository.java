package com.tripnest.tripnestbackend.repository;

import com.tripnest.tripnestbackend.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByTripId(Long tripId);

}