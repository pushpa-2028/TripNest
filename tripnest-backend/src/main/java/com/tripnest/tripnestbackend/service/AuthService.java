package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.dto.AuthResponse;
import com.tripnest.tripnestbackend.dto.LoginRequest;
import com.tripnest.tripnestbackend.dto.RegisterRequest;
import com.tripnest.tripnestbackend.entity.User;
import com.tripnest.tripnestbackend.enums.Role;
import com.tripnest.tripnestbackend.repository.UserRepository;
import com.tripnest.tripnestbackend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);

        userRepository.save(user);

        return "Registration Successful";
    }
}