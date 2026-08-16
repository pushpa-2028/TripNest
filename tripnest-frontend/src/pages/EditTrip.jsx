import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api";

import "../styles/EditTrip.css";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  // =====================================
  // GET TRIP
  // =====================================

  useEffect(() => {
    getTrip();
  }, [id]);

  const getTrip = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        `/trips/${id}`
      );

      setTrip(response.data);

    } catch (error) {
      console.log("Get trip error:", error);

      alert("Failed to load trip.");

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // HANDLE INPUT
  // =====================================

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value
    });
  };

  // =====================================
  // UPDATE TRIP
  // =====================================

  const updateTrip = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/trips/${id}`,
        {
          ...trip,
          budget: Number(trip.budget)
        }
      );

      alert("Trip Updated Successfully!");

      navigate("/my-trips");

    } catch (error) {
      console.log("Update trip error:", error);

      alert("Failed to update trip.");
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="edit-trip-container">

        <div className="edit-trip-card">

          <h2>
            Loading Trip...
          </h2>

        </div>

      </div>
    );
  }

  // =====================================
  // EDIT FORM
  // =====================================

  return (
    <div className="edit-trip-container">

      <div className="edit-trip-card">

        <h2>
          Edit Trip
        </h2>

        <form onSubmit={updateTrip}>

          {/* TRIP NAME */}

          <input
            type="text"
            name="tripName"
            placeholder="Trip Name"
            value={trip.tripName || ""}
            onChange={handleChange}
            required
          />

          {/* DESTINATION */}

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={trip.destination || ""}
            onChange={handleChange}
            required
          />

          {/* START DATE */}

          <label>
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={trip.startDate || ""}
            onChange={handleChange}
            required
          />

          {/* END DATE */}

          <label>
            End Date
          </label>

          <input
            type="date"
            name="endDate"
            value={trip.endDate || ""}
            onChange={handleChange}
            required
          />

          {/* BUDGET */}

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={trip.budget || ""}
            onChange={handleChange}
            min="1"
            required
          />

          {/* DESCRIPTION */}

          <textarea
            name="description"
            rows="5"
            placeholder="Trip Description"
            value={trip.description || ""}
            onChange={handleChange}
            required
          />

          {/* UPDATE BUTTON */}

          <button type="submit">
            Update Trip
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditTrip;