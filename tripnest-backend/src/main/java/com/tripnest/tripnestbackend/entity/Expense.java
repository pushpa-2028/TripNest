package com.tripnest.tripnestbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String expenseName;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String category;

    public Expense() {
    }

    public Expense(Long id, String expenseName, Double amount, String category) {
        this.id = id;
        this.expenseName = expenseName;
        this.amount = amount;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}