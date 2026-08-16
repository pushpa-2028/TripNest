import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";

import "../styles/CreateTrip.css";

function CreateTrip() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: ""
  });

  const [error, setError] = useState("");

  // =====================================
  // HANDLE INPUT CHANGE
  // =====================================

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  // =====================================
  // VALIDATE FORM
  // =====================================

  const validateForm = () => {
    if (!trip.tripName.trim()) {
      return "Please enter a trip name.";
    }

    if (!trip.destination.trim()) {
      return "Please enter a destination.";
    }

    if (!trip.startDate) {
      return "Please select a start date.";
    }

    if (!trip.endDate) {
      return "Please select an end date.";
    }

    if (
      new Date(trip.endDate) <
      new Date(trip.startDate)
    ) {
      return "End date cannot be before start date.";
    }

    if (
      !trip.budget ||
      Number(trip.budget) <= 0
    ) {
      return "Budget must be greater than ₹0.";
    }

    if (!trip.description.trim()) {
      return "Please enter a trip description.";
    }

    return "";
  };

  // =====================================
  // CREATE TRIP
  // =====================================

  const createTrip = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const token = localStorage.getItem("token");

console.log("TOKEN BEFORE CREATE TRIP:", token);

await API.post(
  "/trips",
  {
    ...trip,
    budget: Number(trip.budget)
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

      alert("Trip Created Successfully!");

      setTrip({
        tripName: "",
        destination: "",
        startDate: "",
        endDate: "",
        budget: "",
        description: ""
      });

      setError("");

      navigate("/my-trips");

    } catch (error) {
      console.log("Create trip error:", error);

      if (error.response) {
        console.log(
          "Server response:",
          error.response.data
        );
      }

      setError(
        "Failed to create trip. Please try again."
      );
    }
  };

  return (
    <div className="create-trip-container">

      <div className="create-trip-card">

        <h2>
          Create New Trip
        </h2>

        {/* VALIDATION MESSAGE */}

        {error && (
          <div
            style={{
              background: "#ffebee",
              color: "#c62828",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "18px",
              textAlign: "center"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={createTrip}>

          {/* TRIP NAME */}

          <input
            type="text"
            name="tripName"
            placeholder="Trip Name"
            value={trip.tripName}
            onChange={handleChange}
          />

          {/* DESTINATION */}

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={trip.destination}
            onChange={handleChange}
          />

          {/* START DATE */}

          <label>
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={trip.startDate}
            onChange={handleChange}
          />

          {/* END DATE */}

          <label>
            End Date
          </label>

          <input
            type="date"
            name="endDate"
            value={trip.endDate}
            onChange={handleChange}
          />

          {/* BUDGET */}

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={trip.budget}
            onChange={handleChange}
            min="1"
          />

          {/* DESCRIPTION */}

          <textarea
            name="description"
            placeholder="Trip Description"
            rows="5"
            value={trip.description}
            onChange={handleChange}
          />

          {/* CREATE BUTTON */}

          <button type="submit">
            Create Trip
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTrip