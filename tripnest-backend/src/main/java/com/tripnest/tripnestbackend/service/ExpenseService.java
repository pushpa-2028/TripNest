package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Expense;
import com.tripnest.tripnestbackend.entity.Trip;
import com.tripnest.tripnestbackend.repository.ExpenseRepository;
import com.tripnest.tripnestbackend.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final TripRepository tripRepository;

    public ExpenseService(ExpenseRepository expenseRepository,
                          TripRepository tripRepository) {
        this.expenseRepository = expenseRepository;
        this.tripRepository = tripRepository;
    }

    // Add Expense
    public Expense addExpense(Long tripId, Expense expense) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        expense.setTrip(trip);

        return expenseRepository.save(expense);
    }

    // Get Expenses by Trip
    public List<Expense> getExpensesByTrip(Long tripId) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        return expenseRepository.findByTrip(trip);
    }

    // Get Expense By ID
    public Expense getExpense(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    // Update Expense
    public Expense updateExpense(Long id, Expense updatedExpense) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setExpenseName(updatedExpense.getExpenseName());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setExpenseDate(updatedExpense.getExpenseDate());
        expense.setNotes(updatedExpense.getNotes());

        return expenseRepository.save(expense);
    }

    // Delete Expense
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    // Budget Summary
    public Map<String, Object> getBudgetSummary(Long tripId) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        Double budget = trip.getBudget();

        Double totalExpense = expenseRepository.getTotalExpenseByTrip(tripId);

        if (totalExpense == null) {
            totalExpense = 0.0;
        }

        Double remainingBudget = budget - totalExpense;

        Double percentageUsed = 0.0;

        if (budget > 0) {
            percentageUsed = (totalExpense / budget) * 100;
        }

        Map<String, Object> summary = new HashMap<>();

        summary.put("budget", budget);
        summary.put("totalExpense", totalExpense);
        summary.put("remainingBudget", remainingBudget);
        summary.put("percentageUsed", percentageUsed);

        return summary;
    }
}