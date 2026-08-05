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

    @PostMapping
    public Notification addNotification(@RequestBody Notification notification) {
        return service.saveNotification(notification);
    }

    @GetMapping
    public List<Notification> getNotifications() {
        return service.getAllNotifications();
    }

    @PutMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        return service.markAsRead(id);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id) {
        service.deleteNotification(id);
    }
}