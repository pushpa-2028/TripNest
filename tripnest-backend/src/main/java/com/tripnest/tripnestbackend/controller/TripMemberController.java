package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.TripMember;
import com.tripnest.tripnestbackend.service.TripMemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-members")
@CrossOrigin(origins = "http://localhost:5173")
public class TripMemberController {

    private final TripMemberService service;

    public TripMemberController(TripMemberService service) {
        this.service = service;
    }

    @PostMapping
    public TripMember addMember(@RequestBody TripMember member) {
        return service.addMember(member);
    }

    @GetMapping("/trip/{tripId}")
    public List<TripMember> getMembers(@PathVariable Long tripId) {
        return service.getMembersByTrip(tripId);
    }

    @DeleteMapping("/{id}")
    public void removeMember(@PathVariable Long id) {
        service.removeMember(id);
    }
}