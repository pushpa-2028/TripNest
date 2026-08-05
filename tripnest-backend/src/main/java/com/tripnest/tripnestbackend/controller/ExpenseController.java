package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.Expense;
import com.tripnest.tripnestbackend.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Add Expense
    @PostMapping("/{tripId}")
    public Expense addExpense(@PathVariable Long tripId,
                              @RequestBody Expense expense) {
        return expenseService.addExpense(tripId, expense);
    }

    // Get Expenses by Trip
    @GetMapping("/trip/{tripId}")
    public List<Expense> getExpenses(@PathVariable Long tripId) {
        return expenseService.getExpensesByTrip(tripId);
    }

    // Get Expense by ID
    @GetMapping("/{id}")
    public Expense getExpense(@PathVariable Long id) {
        return expenseService.getExpense(id);
    }

    // Update Expense
    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
                                 @RequestBody Expense expense) {
        return expenseService.updateExpense(id, expense);
    }

    // Delete Expense
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    // Budget Summary
    @GetMapping("/summary/{tripId}")
    public Map<String, Object> getBudgetSummary(@PathVariable Long tripId) {
        return expenseService.getBudgetSummary(tripId);
    }
}