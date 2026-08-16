package com.tripnest.tripnestbackend.repository;

import com.tripnest.tripnestbackend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Get all notifications for a specific user
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Count unread notifications for a specific user
    long countByUserIdAndIsReadFalse(Long userId);

    // Get unread notifications for a specific user
    List<Notification> findByUserIdAndIsReadFalse(Long userId);

    // Check whether a notification already exists
    boolean existsByUserIdAndTypeAndMessage(
            Long userId,
            String type,
            String message
    );
}