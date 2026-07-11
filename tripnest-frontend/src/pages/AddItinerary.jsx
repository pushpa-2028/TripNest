import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AddItinerary.css";

function AddItinerary() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [itinerary, setItinerary] = useState({
        dayNumber: "",
        activity: "",
        location: "",
        activityTime: "",
        notes: ""
    });

    const handleChange = (e) => {
        setItinerary({
            ...itinerary,
            [e.target.name]: e.target.value
        });
    };

    const saveItinerary = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/itineraries",
                {
                    tripId: id,
                    ...itinerary
                }
            );

            alert("Activity Added Successfully!");

            navigate(`/trip/${id}/itinerary`);

        } catch (error) {

            console.log(error);
            alert("Failed to add activity.");

        }

    };

    return (

        <div className="itinerary-container">

            <div className="itinerary-card">

                <h2>Add Activity</h2>

                <form onSubmit={saveItinerary}>

                    <input
                        type="number"
                        name="dayNumber"
                        placeholder="Day Number"
                        value={itinerary.dayNumber}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="activity"
                        placeholder="Activity"
                        value={itinerary.activity}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={itinerary.location}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="activityTime"
                        placeholder="Time (10:00 AM)"
                        value={itinerary.activityTime}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="notes"
                        rows="5"
                        placeholder="Notes"
                        value={itinerary.notes}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit">
                        Save Activity
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddItinerary;