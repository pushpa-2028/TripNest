import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

    const handleChange = (e) => {
        setTrip({
            ...trip,
            [e.target.name]: e.target.value
        });
    };

    const createTrip = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/trips",
                trip
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

            navigate("/my-trips");

        } catch (error) {

            console.log(error);
            alert("Failed to create trip.");

        }

    };

    return (

        <div className="create-trip-container">

            <div className="create-trip-card">

                <h2>Create New Trip</h2>

                <form onSubmit={createTrip}>

                    <input
                        type="text"
                        name="tripName"
                        placeholder="Trip Name"
                        value={trip.tripName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        value={trip.destination}
                        onChange={handleChange}
                        required
                    />

                    <label>Start Date</label>

                    <input
                        type="date"
                        name="startDate"
                        value={trip.startDate}
                        onChange={handleChange}
                        required
                    />

                    <label>End Date</label>

                    <input
                        type="date"
                        name="endDate"
                        value={trip.endDate}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="budget"
                        placeholder="Budget"
                        value={trip.budget}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Trip Description"
                        rows="5"
                        value={trip.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit">
                        Create Trip
                    </button>

                </form>

            </div>

        </div>

    );
}

export default CreateTrip;