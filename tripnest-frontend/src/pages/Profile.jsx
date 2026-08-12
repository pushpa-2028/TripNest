import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
      } catch (error) {
        console.error("Profile API Error:", error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Unable to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="profile-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Header */}
        <div className="profile-heading">
          <button
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back
          </button>

          <div>
            <h1>My Profile</h1>
            <p>Manage and view your TripNest account</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">

          {/* Profile Top */}
          <div className="profile-top">
            <div className="profile-avatar">
              {profile?.fullName
                ? profile.fullName.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="profile-name-section">
              <h2>{profile?.fullName}</h2>
              <p>{profile?.email}</p>

              <span className="role-badge">
                {profile?.role}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="profile-divider"></div>

          {/* Details */}
          <div className="profile-details">

            <div className="profile-detail">
              <div className="detail-icon">👤</div>

              <div>
                <span className="detail-label">Full Name</span>
                <strong>{profile?.fullName}</strong>
              </div>
            </div>

            <div className="profile-detail">
              <div className="detail-icon">📧</div>

              <div>
                <span className="detail-label">Email Address</span>
                <strong>{profile?.email}</strong>
              </div>
            </div>

            <div className="profile-detail">
              <div className="detail-icon">🆔</div>

              <div>
                <span className="detail-label">User ID</span>
                <strong>{profile?.id}</strong>
              </div>
            </div>

            <div className="profile-detail">
              <div className="detail-icon">🛡️</div>

              <div>
                <span className="detail-label">Account Role</span>
                <strong>{profile?.role}</strong>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="profile-card-footer">
            <button
              className="dashboard-button"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;