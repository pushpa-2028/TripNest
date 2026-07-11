import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/trips");
      setTrips(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();

  const totalTrips = trips.length;

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) >= today
  ).length;

  const totalBudget = trips.reduce(
    (sum, trip) => sum + Number(trip.budget),
    0
  );

  const totalDestinations = new Set(
    trips.map((trip) => trip.destination)
  ).size;

  return (
    <div className="dashboard">

      <h1>TripNest Dashboard ✈️</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>{totalTrips}</h2>
          <p>Total Trips</p>
        </div>

        <div className="dashboard-card">
          <h2>{totalDestinations}</h2>
          <p>Total Destinations</p>
        </div>

        <div className="dashboard-card">
          <h2>{upcomingTrips}</h2>
          <p>Upcoming Trips</p>
        </div>

        <div className="dashboard-card">
          <h2>₹{totalBudget}</h2>
          <p>Total Budget</p>
        </div>

      </div>

      <div className="recent-trips">

        <h2>Recent Trips</h2>

        <table>

          <thead>
            <tr>
              <th>Trip</th>
              <th>Destination</th>
              <th>Start Date</th>
              <th>Budget</th>
            </tr>
          </thead>

          <tbody>

            {trips.length > 0 ? (
              trips.map((trip) => (
                <tr key={trip.id}>
                  <td>{trip.tripName}</td>
                  <td>{trip.destination}</td>
                  <td>{trip.startDate}</td>
                  <td>₹{trip.budget}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No trips found.</td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;