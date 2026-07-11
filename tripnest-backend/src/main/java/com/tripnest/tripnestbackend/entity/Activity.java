package com.tripnest.tripnestbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String activityName;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String activityTime;

    public Activity() {
    }

    public Activity(Long id, String activityName, String location, String activityTime) {
        this.id = id;
        this.activityName = activityName;
        this.location = location;
        this.activityTime = activityTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getActivityTime() {
        return activityTime;
    }

    public void setActivityTime(String activityTime) {
        this.activityTime = activityTime;
    }
}