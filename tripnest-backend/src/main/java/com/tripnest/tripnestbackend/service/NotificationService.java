package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Notification;
import com.tripnest.tripnestbackend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    // Add Notification
    public Notification saveNotification(Notification notification) {
        return repository.save(notification);
    }

    // Get All Notifications
    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }

    // Mark as Read
    public Notification markAsRead(Long id) {

        Notification notification = repository.findById(id).orElse(null);

        if (notification != null) {
            notification.setRead(true);
            return repository.save(notification);
        }

        return null;
    }

    // Delete Notification
    public void deleteNotification(Long id) {
        repository.deleteById(id);
    }
}