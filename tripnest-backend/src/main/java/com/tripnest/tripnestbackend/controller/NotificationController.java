package com.tripnest.tripnestbackend.controller;

import com.tripnest.tripnestbackend.entity.Notification;
import com.tripnest.tripnestbackend.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    // Create notification
    @PostMapping
    public Notification addNotification(
            @RequestBody Notification notification
    ) {
        return service.saveNotification(notification);
    }

    // Get notifications for a specific user
    @GetMapping("/user/{userId}")
    public List<Notification> getUserNotifications(
            @PathVariable Long userId
    ) {
        return service.getUserNotifications(userId);
    }

    // Get unread notification count
    @GetMapping("/user/{userId}/unread-count")
    public long getUnreadCount(
            @PathVariable Long userId
    ) {
        return service.getUnreadCount(userId);
    }

    // Mark one notification as read
    @PutMapping("/{id}/read")
    public Notification markAsRead(
            @PathVariable Long id
    ) {
        return service.markAsRead(id);
    }

    // Mark all notifications as read
    @PutMapping("/user/{userId}/read-all")
    public void markAllAsRead(
            @PathVariable Long userId
    ) {
        service.markAllAsRead(userId);
    }

    // Delete notification
    @DeleteMapping("/{id}")
    public void deleteNotification(
            @PathVariable Long id
    ) {
        service.deleteNotification(id);
    }
}