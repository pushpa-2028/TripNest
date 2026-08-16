package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.DashboardResponse;
import com.tripnest.tripnestbackend.entity.Expense;
import com.tripnest.tripnestbackend.entity.Trip;
import com.tripnest.tripnestbackend.repository.ExpenseRepository;
import com.tripnest.tripnestbackend.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TripRepository tripRepository;
    private final ExpenseRepository expenseRepository;

    public DashboardService(
            TripRepository tripRepository,
            ExpenseRepository expenseRepository) {

        this.tripRepository = tripRepository;
        this.expenseRepository = expenseRepository;
    }

    public DashboardResponse getDashboardData() {

        // =====================================
        // GET DATA
        // =====================================

        List<Trip> trips = tripRepository.findAll();

        List<Expense> expenses = expenseRepository.findAll();

        // =====================================
        // TOTAL TRIPS
        // =====================================

        int totalTrips = trips.size();

        // =====================================
        // TOTAL DESTINATIONS
        // =====================================

        Set<String> destinationSet = trips.stream()
                .map(Trip::getDestination)
                .filter(destination ->
                        destination != null &&
                                !destination.trim().isEmpty())
                .collect(Collectors.toSet());

        int totalDestinations = destinationSet.size();

        // =====================================
        // UPCOMING TRIPS
        // =====================================

        LocalDate today = LocalDate.now();

        int upcomingTrips = (int) trips.stream()
                .filter(trip ->
                        trip.getStartDate() != null &&
                                !trip.getStartDate().isBefore(today))
                .count();

        // =====================================
        // TOTAL BUDGET
        // =====================================

        double totalBudget = trips.stream()
                .mapToDouble(trip ->
                        trip.getBudget() != null
                                ? trip.getBudget()
                                : 0.0)
                .sum();

        // =====================================
        // TOTAL EXPENSES
        // =====================================

        double totalExpenses = expenses.stream()
                .mapToDouble(expense ->
                        expense.getAmount() != null
                                ? expense.getAmount()
                                : 0.0)
                .sum();

        // =====================================
        // REMAINING BUDGET
        // =====================================

        double remainingBudget =
                totalBudget - totalExpenses;

        // =====================================
        // BUDGET USED %
        // =====================================

        double budgetUsedPercentage = 0.0;

        if (totalBudget > 0) {

            budgetUsedPercentage =
                    (totalExpenses / totalBudget) * 100;
        }

        // =====================================
        // EXPENSE CATEGORY TOTALS
        // =====================================

        Map<String, Double> categoryTotals =
                new LinkedHashMap<>();

        for (Expense expense : expenses) {

            String category = expense.getCategory();

            if (category == null ||
                    category.trim().isEmpty()) {

                category = "Other";
            }

            double amount =
                    expense.getAmount() != null
                            ? expense.getAmount()
                            : 0.0;

            categoryTotals.merge(
                    category,
                    amount,
                    Double::sum
            );
        }

        // =====================================
        // RESPONSE
        // =====================================

        return new DashboardResponse(
                totalTrips,
                totalDestinations,
                upcomingTrips,
                totalBudget,
                totalExpenses,
                remainingBudget,
                budgetUsedPercentage,
                trips,
                categoryTotals
        );
    }
}