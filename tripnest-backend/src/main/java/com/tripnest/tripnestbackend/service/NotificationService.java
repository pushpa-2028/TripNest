package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Notification;
import com.tripnest.tripnestbackend.entity.User;
import com.tripnest.tripnestbackend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    // Create Notification
    public Notification saveNotification(Notification notification) {
        return repository.save(notification);
    }

    // Get all notifications for a specific user
    public List<Notification> getUserNotifications(Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // Get unread notification count
    public long getUnreadCount(Long userId) {
        return repository.countByUserIdAndIsReadFalse(userId);
    }

    // Mark one notification as read
    public Notification markAsRead(Long id) {

        Notification notification = repository.findById(id).orElse(null);

        if (notification != null) {
            notification.setRead(true);
            return repository.save(notification);
        }

        return null;
    }

    // Mark all notifications as read for a user
    public void markAllAsRead(Long userId) {

        List<Notification> notifications =
                repository.findByUserIdAndIsReadFalse(userId);

        for (Notification notification : notifications) {
            notification.setRead(true);
        }

        repository.saveAll(notifications);
    }

    // Delete notification
    public void deleteNotification(Long id) {
        repository.deleteById(id);
    }
}