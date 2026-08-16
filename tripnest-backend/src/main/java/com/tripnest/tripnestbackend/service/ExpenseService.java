package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Expense;
import com.tripnest.tripnestbackend.entity.Notification;
import com.tripnest.tripnestbackend.entity.Trip;
import com.tripnest.tripnestbackend.repository.ExpenseRepository;
import com.tripnest.tripnestbackend.repository.NotificationRepository;
import com.tripnest.tripnestbackend.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final TripRepository tripRepository;
    private final NotificationRepository notificationRepository;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            TripRepository tripRepository,
            NotificationRepository notificationRepository) {

        this.expenseRepository = expenseRepository;
        this.tripRepository = tripRepository;
        this.notificationRepository = notificationRepository;
    }

    // =====================================
    // ADD EXPENSE
    // =====================================

    public Expense addExpense(
            Long tripId,
            Expense expense) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(
                        () -> new RuntimeException("Trip not found")
                );

        expense.setTrip(trip);

        Expense savedExpense =
                expenseRepository.save(expense);

        // Check budget after adding expense
        checkBudgetAlert(trip);

        return savedExpense;
    }

    // =====================================
    // GET EXPENSES BY TRIP
    // =====================================

    public List<Expense> getExpensesByTrip(Long tripId) {

        return expenseRepository.findByTripId(tripId);
    }

    // =====================================
    // GET EXPENSE BY ID
    // =====================================

    public Expense getExpense(Long id) {

        return expenseRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Expense not found")
                );
    }

    // =====================================
    // UPDATE EXPENSE
    // =====================================

    public Expense updateExpense(
            Long id,
            Expense updatedExpense) {

        Expense expense =
                expenseRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Expense not found"
                                )
                        );

        expense.setExpenseName(
                updatedExpense.getExpenseName()
        );

        expense.setAmount(
                updatedExpense.getAmount()
        );

        expense.setCategory(
                updatedExpense.getCategory()
        );

        expense.setExpenseDate(
                updatedExpense.getExpenseDate()
        );

        expense.setNotes(
                updatedExpense.getNotes()
        );

        Expense savedExpense =
                expenseRepository.save(expense);

        // Check budget after updating expense
        checkBudgetAlert(expense.getTrip());

        return savedExpense;
    }

    // =====================================
    // DELETE EXPENSE
    // =====================================

    public void deleteExpense(Long id) {

        Expense expense =
                expenseRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Expense not found"
                                )
                        );

        Trip trip = expense.getTrip();

        expenseRepository.deleteById(id);

        // Recalculate budget after deleting expense
        checkBudgetAlert(trip);
    }

    // =====================================
    // BUDGET SUMMARY
    // =====================================

    public Map<String, Object> getBudgetSummary(
            Long tripId) {

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(
                        () -> new RuntimeException("Trip not found")
                );

        Double budget = trip.getBudget();

        Double totalExpense =
                expenseRepository.getTotalExpenseByTrip(
                        tripId
                );

        if (totalExpense == null) {
            totalExpense = 0.0;
        }

        if (budget == null) {
            budget = 0.0;
        }

        Double remainingBudget =
                budget - totalExpense;

        Double percentageUsed = 0.0;

        if (budget > 0) {
            percentageUsed =
                    (totalExpense / budget) * 100;
        }

        Map<String, Object> summary =
                new HashMap<>();

        summary.put("budget", budget);

        summary.put(
                "totalExpense",
                totalExpense
        );

        summary.put(
                "remainingBudget",
                remainingBudget
        );

        summary.put(
                "percentageUsed",
                percentageUsed
        );

        return summary;
    }

    // =====================================
    // BUDGET ALERT
    // =====================================

    private void checkBudgetAlert(Trip trip) {

        System.out.println(
                "========================================"
        );

        System.out.println(
                "BUDGET ALERT CHECK STARTED"
        );

        if (trip == null) {

            System.out.println(
                    "Budget alert skipped: Trip is null."
            );

            return;
        }

        if (trip.getUser() == null) {

            System.out.println(
                    "Budget alert skipped: Trip has no owner."
            );

            return;
        }

        Double budget = trip.getBudget();

        if (budget == null || budget <= 0) {

            System.out.println(
                    "Budget alert skipped: Invalid budget."
            );

            return;
        }

        Double totalExpense =
                expenseRepository.getTotalExpenseByTrip(
                        trip.getId()
                );

        if (totalExpense == null) {
            totalExpense = 0.0;
        }

        double percentageUsed =
                (totalExpense / budget) * 100;

        Long userId =
                trip.getUser().getId();

        System.out.println(
                "Trip ID: " + trip.getId()
        );

        System.out.println(
                "User ID: " + userId
        );

        System.out.println(
                "Budget: ₹" + budget
        );

        System.out.println(
                "Total Expense: ₹" + totalExpense
        );

        System.out.println(
                "Percentage Used: "
                        + percentageUsed
                        + "%"
        );

        // =====================================
        // 100% BUDGET ALERT
        // =====================================

        if (percentageUsed >= 100) {

            String message =
                    "Your trip budget has been exceeded. "
                            + "You have spent ₹"
                            + String.format(
                            "%.2f",
                            totalExpense
                    )
                            + " out of ₹"
                            + String.format(
                            "%.2f",
                            budget
                    )
                            + ".";

            createBudgetNotification(
                    trip,
                    userId,
                    "BUDGET_EXCEEDED",
                    "Budget Exceeded",
                    message
            );

        }

        // =====================================
        // 80% BUDGET ALERT
        // =====================================

        else if (percentageUsed >= 80) {

            String message =
                    "You have used "
                            + String.format(
                            "%.2f",
                            percentageUsed
                    )
                            + "% of your trip budget. "
                            + "You have spent ₹"
                            + String.format(
                            "%.2f",
                            totalExpense
                    )
                            + " out of ₹"
                            + String.format(
                            "%.2f",
                            budget
                    )
                            + ".";

            createBudgetNotification(
                    trip,
                    userId,
                    "BUDGET_WARNING",
                    "Budget Warning",
                    message
            );
        }

        else {

            System.out.println(
                    "Budget is below warning threshold."
            );
        }

        System.out.println(
                "BUDGET ALERT CHECK FINISHED"
        );

        System.out.println(
                "========================================"
        );
    }

    // =====================================
    // CREATE BUDGET NOTIFICATION
    // =====================================

    private void createBudgetNotification(
            Trip trip,
            Long userId,
            String type,
            String title,
            String message) {

        boolean alreadyExists =
                notificationRepository
                        .existsByUserIdAndTypeAndMessage(
                                userId,
                                type,
                                message
                        );

        if (alreadyExists) {

            System.out.println(
                    "Budget notification already exists. Skipping."
            );

            return;
        }

        Notification notification =
                new Notification();

        notification.setTitle(title);

        notification.setMessage(message);

        notification.setType(type);

        notification.setUser(
                trip.getUser()
        );

        notification.setRead(false);

        notificationRepository.save(
                notification
        );

        System.out.println(
                "SUCCESS: Budget notification created!"
        );
    }
}