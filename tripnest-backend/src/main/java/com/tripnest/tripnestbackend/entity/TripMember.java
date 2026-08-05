package com.tripnest.tripnestbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "trip_members")
public class TripMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tripId;

    private String memberName;

    private String memberEmail;

    private String role;

    public TripMember() {
    }

    public TripMember(Long id, Long tripId, String memberName, String memberEmail, String role) {
        this.id = id;
        this.tripId = tripId;
        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}