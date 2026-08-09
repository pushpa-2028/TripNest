import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaUsers,
  FaFileAlt,
  FaRoute,
  FaSearch
} from "react-icons/fa";

import "../styles/MyTrips.css";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(
        "https://tripnest-fird.onrender.com/api/trips"
      );

      setTrips(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTrip = (id) => {
    navigate(`/edit-trip/${id}`);
  };

  const manageItinerary = (id) => {
    navigate(`/trip/${id}/itinerary`);
  };

  const manageExpenses = (id) => {
    navigate(`/trip/${id}/expenses`);
  };

  const manageMembers = (id) => {
    navigate(`/trip/${id}/members`);
  };

  const manageDocuments = (id) => {
    navigate(`/trip/${id}/documents`);
  };

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;

    try {
      await axios.delete(
        `https://tripnest-fird.onrender.com/api/trips/${id}`
      );

      fetchTrips();
    } catch (error) {
      console.log(error);
      alert("Failed to delete trip.");
    }
  };

  const filteredTrips = trips.filter((trip) => {
    const text = search.toLowerCase();

    return (
      trip.tripName.toLowerCase().includes(text) ||
      trip.destination.toLowerCase().includes(text)
    );
  });

  return (
    <div className="myTrips">

      <div className="pageHeader">

        <h1>🌍 My Trips</h1>

        <p>
          Organize and manage all your travel plans.
        </p>

      </div>

      <div className="searchContainer">

        <FaSearch className="searchIcon" />

        <input
          type="text"
          placeholder="Search trip..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="tripGrid">

        {filteredTrips.length === 0 ? (

          <div className="emptyCard">

            <h2>No Trips Found</h2>

            <p>Create your first trip.</p>

          </div>

        ) : (

          filteredTrips.map((trip) => (

            <div className="tripCard" key={trip.id}>

              <div className="cardHeader">

                <div>

                  <h2>{trip.tripName}</h2>

                  <span className="destination">

                    <FaMapMarkerAlt />

                    {trip.destination}

                  </span>

                </div>

                <div className="budget">

                  ₹{Number(trip.budget).toLocaleString()}

                </div>

              </div>

              <div className="dates">

                <FaCalendarAlt />

                <span>

                  {trip.startDate} → {trip.endDate}

                </span>

              </div>

              <div className="description">

                {trip.description}

              </div>

              <div className="buttonGrid">

                <button
                  className="edit"
                  onClick={() => editTrip(trip.id)}
                >
                  <FaEdit />

                  Edit
                </button>

                <button
                  className="blue"
                  onClick={() => manageItinerary(trip.id)}
                >
                  <FaRoute />

                  Itinerary
                </button>

                <button
                  className="green"
                  onClick={() => manageExpenses(trip.id)}
                >
                  <FaWallet />

                  Expenses
                </button>

                <button
                  className="purple"
                  onClick={() => manageMembers(trip.id)}
                >
                  <FaUsers />

                  Members
                </button>

                <button
                  className="indigo"
                  onClick={() => manageDocuments(trip.id)}
                >
                  <FaFileAlt />

                  Documents
                </button>

                <button
                  className="delete"
                  onClick={() => deleteTrip(trip.id)}
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
