package com.tripnest.tripnestbackend.entity;

import java.util.List;
import java.util.Map;

public class DashboardResponse {

    private int totalTrips;
    private int totalDestinations;
    private int upcomingTrips;
    private double totalBudget;
    private double totalExpenses;
    private double remainingBudget;
    private double budgetUsedPercentage;

    private List<Trip> trips;
    private Map<String, Double> categoryTotals;

    public DashboardResponse() {
    }

    public DashboardResponse(
            int totalTrips,
            int totalDestinations,
            int upcomingTrips,
            double totalBudget,
            double totalExpenses,
            double remainingBudget,
            double budgetUsedPercentage,
            List<Trip> trips,
            Map<String, Double> categoryTotals) {

        this.totalTrips = totalTrips;
        this.totalDestinations = totalDestinations;
        this.upcomingTrips = upcomingTrips;
        this.totalBudget = totalBudget;
        this.totalExpenses = totalExpenses;
        this.remainingBudget = remainingBudget;
        this.budgetUsedPercentage = budgetUsedPercentage;
        this.trips = trips;
        this.categoryTotals = categoryTotals;
    }

    public int getTotalTrips() {
        return totalTrips;
    }

    public void setTotalTrips(int totalTrips) {
        this.totalTrips = totalTrips;
    }

    public int getTotalDestinations() {
        return totalDestinations;
    }

    public void setTotalDestinations(int totalDestinations) {
        this.totalDestinations = totalDestinations;
    }

    public int getUpcomingTrips() {
        return upcomingTrips;
    }

    public void setUpcomingTrips(int upcomingTrips) {
        this.upcomingTrips = upcomingTrips;
    }

    public double getTotalBudget() {
        return totalBudget;
    }

    public void setTotalBudget(double totalBudget) {
        this.totalBudget = totalBudget;
    }

    public double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }

    public double getBudgetUsedPercentage() {
        return budgetUsedPercentage;
    }

    public void setBudgetUsedPercentage(double budgetUsedPercentage) {
        this.budgetUsedPercentage = budgetUsedPercentage;
    }

    public List<Trip> getTrips() {
        return trips;
    }

    public void setTrips(List<Trip> trips) {
        this.trips = trips;
    }

    public Map<String, Double> getCategoryTotals() {
        return categoryTotals;
    }

    public void setCategoryTotals(
            Map<String, Double> categoryTotals) {
        this.categoryTotals = categoryTotals;
    }
}