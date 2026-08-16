package com.tripnest.tripnestbackend.service;

import com.tripnest.tripnestbackend.entity.Notification;
import com.tripnest.tripnestbackend.entity.Trip;
import com.tripnest.tripnestbackend.repository.NotificationRepository;
import com.tripnest.tripnestbackend.repository.TripRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TripReminderService {

    private final TripRepository tripRepository;
    private final NotificationRepository notificationRepository;

    public TripReminderService(
            TripRepository tripRepository,
            NotificationRepository notificationRepository
    ) {
        this.tripRepository = tripRepository;
        this.notificationRepository = notificationRepository;
    }

    // =========================================
    // TEST MODE
    // Runs every minute
    // =========================================

    @Scheduled(cron = "0 0 9 * * *")
    public void checkUpcomingTrips() {

        System.out.println(
                "========================================"
        );

        System.out.println(
                "TRIP REMINDER CHECK STARTED"
        );

        LocalDate tomorrow =
                LocalDate.now().plusDays(1);

        System.out.println(
                "Looking for trips starting on: "
                        + tomorrow
        );

        List<Trip> trips =
                tripRepository.findByStartDate(tomorrow);

        System.out.println(
                "Trips found: " + trips.size()
        );

        for (Trip trip : trips) {

            System.out.println(
                    "Checking trip: "
                            + trip.getTripName()
            );

            System.out.println(
                    "Destination: "
                            + trip.getDestination()
            );

            // Check owner
            if (trip.getUser() == null) {

                System.out.println(
                        "SKIPPED: Trip has no owner/user."
                );

                continue;
            }

            Long userId =
                    trip.getUser().getId();

            System.out.println(
                    "Trip owner user ID: "
                            + userId
            );

            String message =
                    "Your trip to "
                            + trip.getDestination()
                            + " starts tomorrow!";

            boolean alreadyExists =
                    notificationRepository
                            .existsByUserIdAndTypeAndMessage(
                                    userId,
                                    "TRIP_REMINDER",
                                    message
                            );

            if (alreadyExists) {

                System.out.println(
                        "Reminder already exists. Skipping."
                );

                continue;
            }

            Notification notification =
                    new Notification();

            notification.setTitle(
                    "Trip Reminder"
            );

            notification.setMessage(
                    message
            );

            notification.setType(
                    "TRIP_REMINDER"
            );

            notification.setUser(
                    trip.getUser()
            );

            notification.setRead(false);

            notificationRepository.save(
                    notification
            );

            System.out.println(
                    "SUCCESS: Trip reminder created for: "
                            + trip.getDestination()
            );
        }

        System.out.println(
                "TRIP REMINDER CHECK FINISHED"
        );

        System.out.println(
                "========================================"
        );
    }
}