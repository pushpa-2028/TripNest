import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";

import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaUsers,
  FaFileAlt,
  FaRoute,
  FaSearch,
  FaEye
} from "react-icons/fa";

import "../styles/MyTrips.css";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // =====================================
  // FETCH TRIPS
  // =====================================

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);

      const response = await API.get("/trips");

      setTrips(response.data || []);

    } catch (error) {
      console.log("Fetch trips error:", error);

      setTrips([]);

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // VIEW TRIP DETAILS
  // =====================================

  const viewTripDetails = (id) => {
    navigate(`/trip/${id}`);
  };

  // =====================================
  // EDIT TRIP
  // =====================================

  const editTrip = (id) => {
    navigate(`/edit-trip/${id}`);
  };

  // =====================================
  // ITINERARY
  // =====================================

  const manageItinerary = (id) => {
    navigate(`/trip/${id}/itinerary`);
  };

  // =====================================
  // EXPENSES
  // =====================================

  const manageExpenses = (id) => {
    navigate(`/trip/${id}/expenses`);
  };

  // =====================================
  // MEMBERS
  // =====================================

  const manageMembers = (id) => {
    navigate(`/trip/${id}/members`);
  };

  // =====================================
  // DOCUMENTS
  // =====================================

  const manageDocuments = (id) => {
    navigate(`/trip/${id}/documents`);
  };

  // =====================================
  // DELETE TRIP
  // =====================================

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) {
      return;
    }

    try {
      await API.delete(`/trips/${id}`);

      alert("Trip deleted successfully.");

      fetchTrips();

    } catch (error) {
      console.log("Delete trip error:", error);

      alert("Failed to delete trip.");
    }
  };

  // =====================================
  // SEARCH
  // =====================================

  const filteredTrips = trips.filter((trip) => {
    const text = search.toLowerCase();

    const tripName =
      trip.tripName?.toLowerCase() || "";

    const destination =
      trip.destination?.toLowerCase() || "";

    return (
      tripName.includes(text) ||
      destination.includes(text)
    );
  });

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="my-trips-page">

        <div className="pageHeader">
          <h1>🌍 My Trips</h1>

          <p>
            Loading your trips...
          </p>
        </div>

      </div>
    );
  }

  // =====================================
  // MAIN PAGE
  // =====================================

  return (
    <div className="my-trips-page">

      {/* PAGE HEADER */}

      <div className="pageHeader">

        <h1>
          🌍 My Trips
        </h1>

        <p>
          Organize and manage all your travel plans.
        </p>

      </div>

      {/* SEARCH */}

      <div className="searchContainer">

        <FaSearch className="searchIcon" />

        <input
          type="text"
          placeholder="Search trip..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* TRIP GRID */}

      <div className="tripGrid">

        {filteredTrips.length === 0 ? (

          <div className="emptyCard">

            <h2>
              No Trips Found
            </h2>

            <p>
              Create your first trip.
            </p>

          </div>

        ) : (

          filteredTrips.map((trip) => (

            <div
              className="tripCard"
              key={trip.id}
            >

              {/* CARD HEADER */}

              <div className="cardHeader">

                <div>

                  <h2>
                    {trip.tripName}
                  </h2>

                  <span className="destination">

                    <FaMapMarkerAlt />

                    {trip.destination}

                  </span>

                </div>

                <div className="budget">

                  ₹
                  {Number(
                    trip.budget || 0
                  ).toLocaleString()}

                </div>

              </div>

              {/* DATES */}

              <div className="dates">

                <FaCalendarAlt />

                <span>

                  {trip.startDate}
                  {" → "}
                  {trip.endDate}

                </span>

              </div>

              {/* DESCRIPTION */}

              <div className="description">

                {trip.description}

              </div>

              {/* BUTTONS */}

              <div className="buttonGrid">

                {/* VIEW DETAILS */}

                <button
                  className="blue"
                  onClick={() =>
                    viewTripDetails(trip.id)
                  }
                >

                  <FaEye />

                  View Details

                </button>

                {/* EDIT */}

                <button
                  className="edit"
                  onClick={() =>
                    editTrip(trip.id)
                  }
                >

                  <FaEdit />

                  Edit

                </button>

                {/* ITINERARY */}

                <button
                  className="blue"
                  onClick={() =>
                    manageItinerary(trip.id)
                  }
                >

                  <FaRoute />

                  Itinerary

                </button>

                {/* EXPENSES */}

                <button
                  className="green"
                  onClick={() =>
                    manageExpenses(trip.id)
                  }
                >

                  <FaWallet />

                  Expenses

                </button>

                {/* MEMBERS */}

                <button
                  className="purple"
                  onClick={() =>
                    manageMembers(trip.id)
                  }
                >

                  <FaUsers />

                  Members

                </button>

                {/* DOCUMENTS */}

                <button
                  className="indigo"
                  onClick={() =>
                    manageDocuments(trip.id)
                  }
                >

                  <FaFileAlt />

                  Documents

                </button>

                {/* DELETE */}

                <button
                  className="delete"
                  onClick={() =>
                    deleteTrip(trip.id)
                  }
                >

                  <FaTrash />

                  Delete

                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default MyTrips;