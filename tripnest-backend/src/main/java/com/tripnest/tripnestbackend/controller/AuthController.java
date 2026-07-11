package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.dto.AuthResponse;
import com.tripnest.tripnestbackend.dto.LoginRequest;
import com.tripnest.tripnestbackend.dto.RegisterRequest;
import com.tripnest.tripnestbackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
}