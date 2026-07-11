import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MyTrips.css";

function MyTrips() {

    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/trips"
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

    const deleteTrip = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this trip?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/api/trips/${id}`
            );

            alert("Trip deleted successfully!");

            fetchTrips();

        } catch (error) {

            console.log(error);
            alert("Failed to delete trip.");

        }

    };

    return (

        <div className="trips-container">

            <h2>My Trips</h2>

            <table className="trip-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Trip Name</th>
                        <th>Destination</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Budget</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {trips.map((trip) => (

                        <tr key={trip.id}>

                            <td>{trip.id}</td>
                            <td>{trip.tripName}</td>
                            <td>{trip.destination}</td>
                            <td>{trip.startDate}</td>
                            <td>{trip.endDate}</td>
                            <td>₹{trip.budget}</td>
                            <td>{trip.description}</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => editTrip(trip.id)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="itinerary-btn"
                                    onClick={() => manageItinerary(trip.id)}
                                >
                                    Itinerary
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteTrip(trip.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default MyTrips;