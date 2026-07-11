package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.dto.DashboardResponse;
import com.tripnest.tripnestbackend.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping
    public DashboardResponse getDashboardData() {
        return service.getDashboardData();
    }

}