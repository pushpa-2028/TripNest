package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.Expense;
import com.tripnest.tripnestbackend.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://trip-nest-tau-six.vercel.app"
})
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // =====================================
    // ADD EXPENSE
    // =====================================

    @PostMapping("/{tripId}")
    public Expense addExpense(
            @PathVariable Long tripId,
            @RequestBody Expense expense) {

        return expenseService.addExpense(tripId, expense);
    }

    // =====================================
    // GET EXPENSES BY TRIP
    // =====================================

    @GetMapping("/trip/{tripId}")
    public ResponseEntity<?> getExpenses(
            @PathVariable Long tripId) {

        try {

            List<Expense> expenses =
                    expenseService.getExpensesByTrip(tripId);

            return ResponseEntity.ok(expenses);

        } catch (Exception e) {

            e.printStackTrace();

            Map<String, Object> error =
                    new HashMap<>();

            error.put("error", "Failed to get expenses");
            error.put("exception", e.getClass().getName());
            error.put("message", e.getMessage());

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }

    // =====================================
    // GET EXPENSE BY ID
    // =====================================

    @GetMapping("/{id}")
    public Expense getExpense(
            @PathVariable Long id) {

        return expenseService.getExpense(id);
    }

    // =====================================
    // UPDATE EXPENSE
    // =====================================

    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense) {

        return expenseService.updateExpense(id, expense);
    }

    // =====================================
    // DELETE EXPENSE
    // =====================================

    @DeleteMapping("/{id}")
    public void deleteExpense(
            @PathVariable Long id) {

        expenseService.deleteExpense(id);
    }

    // =====================================
    // BUDGET SUMMARY
    // =====================================

    @GetMapping("/summary/{tripId}")
    public ResponseEntity<?> getBudgetSummary(
            @PathVariable Long tripId) {

        try {

            Map<String, Object> summary =
                    expenseService.getBudgetSummary(tripId);

            return ResponseEntity.ok(summary);

        } catch (Exception e) {

            e.printStackTrace();

            Map<String, Object> error =
                    new HashMap<>();

            error.put("error", "Failed to get budget summary");
            error.put("exception", e.getClass().getName());
            error.put("message", e.getMessage());

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);
        }
    }
}