import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Notifications.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080/api";

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetchNotifications();
  }, [userId, navigate]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/notifications/user/${userId}`,
        {
          timeout: 15000,
        }
      );

      setNotifications(response.data);
    } catch (error) {
      console.error(
        "Error fetching notifications:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/notifications/${id}/read`
      );

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Error marking notification as read:",
        error
      );
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/notifications/${id}`
      );

      setNotifications((previous) =>
        previous.filter(
          (notification) => notification.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting notification:",
        error
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/notifications/user/${userId}/read-all`
      );

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error(
        "Error marking all notifications as read:",
        error
      );
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "TRIP_REMINDER":
        return "🧳";

      case "BUDGET_ALERT":
        return "💰";

      case "ACTIVITY_REMINDER":
        return "📅";

      case "INVITATION":
        return "👥";

      case "TRAVEL_UPDATE":
        return "✈️";

      default:
        return "🔔";
    }
  };

  if (loading) {
    return (
      <div className="notifications-page">
        <div className="notifications-container">
          <div className="notifications-loading">
            Loading notifications...
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="notifications-page">

      <div className="notifications-container">

        <div className="notifications-header">

          <div>
            <h1>Notifications</h1>

            <p>
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }`
                : "You're all caught up!"}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              className="mark-all-btn"
              onClick={markAllAsRead}
            >
              ✓ Mark all as read
            </button>
          )}

        </div>

        {notifications.length === 0 ? (

          <div className="empty-notifications">

            <div className="empty-icon">
              🔔
            </div>

            <h2>No notifications</h2>

            <p>
              You don't have any notifications yet.
            </p>

          </div>

        ) : (

          <div className="notifications-list">

            {notifications.map((notification) => (

              <div
                key={notification.id}
                className={`notification-card ${
                  notification.read
                    ? "notification-read"
                    : "notification-unread"
                }`}
              >

                <div className="notification-icon">
                  {getIcon(notification.type)}
                </div>

                <div className="notification-content">

                  <div className="notification-title-row">

                    <h3>
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="unread-dot"></span>
                    )}

                  </div>

                  <p>
                    {notification.message}
                  </p>

                  {notification.createdAt && (
                    <small>
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </small>
                  )}

                </div>

                <div className="notification-actions">

                  {!notification.read && (
                    <button
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteNotification(notification.id)
                    }
                    title="Delete notification"
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Notifications;