package com.tripnest.tripnestbackend.repository;

import com.tripnest.tripnestbackend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Get all expenses directly using trip ID
    List<Expense> findByTripId(Long tripId);

    // Calculate total expenses of a trip
    @Query("""
           SELECT COALESCE(SUM(e.amount), 0)
           FROM Expense e
           WHERE e.trip.id = :tripId
           """)
    Double getTotalExpenseByTrip(Long tripId);
}