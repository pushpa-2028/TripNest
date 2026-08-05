package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.TripMember;
import com.tripnest.tripnestbackend.repository.TripMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripMemberService {

    private final TripMemberRepository repository;

    public TripMemberService(TripMemberRepository repository) {
        this.repository = repository;
    }

    public TripMember addMember(TripMember member) {
        return repository.save(member);
    }

    public List<TripMember> getMembersByTrip(Long tripId) {
        return repository.findByTripId(tripId);
    }

    public void removeMember(Long id) {
        repository.deleteById(id);
    }
}