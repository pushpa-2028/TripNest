import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api";

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

    const [saving, setSaving] = useState(false);

    // =========================================
    // HANDLE INPUT CHANGE
    // =========================================

    const handleChange = (e) => {

        setItinerary({
            ...itinerary,
            [e.target.name]: e.target.value
        });

    };

    // =========================================
    // SAVE ACTIVITY
    // =========================================

    const saveItinerary = async (e) => {

        e.preventDefault();

        // Prevent multiple clicks
        if (saving) {
            return;
        }

        setSaving(true);

        try {

            console.log("Saving itinerary for trip:", id);

            const response = await API.post(
                "/itineraries",
                {
                    tripId: Number(id),
                    dayNumber: Number(itinerary.dayNumber),
                    activity: itinerary.activity,
                    location: itinerary.location,
                    activityTime: itinerary.activityTime,
                    notes: itinerary.notes
                }
            );

            console.log(
                "Itinerary saved successfully:",
                response.data
            );

            alert("Activity Added Successfully!");

            navigate(`/trip/${id}/itinerary`);

        } catch (error) {

            console.error(
                "Failed to save itinerary:",
                error
            );

            if (error.response) {

                console.error(
                    "Server response:",
                    error.response.data
                );

                console.error(
                    "Status:",
                    error.response.status
                );

            }

            alert("Failed to add activity.");

            // Allow user to try again
            setSaving(false);
        }

    };

    return (

        <div className="itinerary-container">

            <div className="itinerary-card">

                <h2>Add Activity</h2>

                <form onSubmit={saveItinerary}>

                    {/* DAY NUMBER */}

                    <input
                        type="number"
                        name="dayNumber"
                        placeholder="Day Number"
                        value={itinerary.dayNumber}
                        onChange={handleChange}
                        min="1"
                        required
                        disabled={saving}
                    />

                    {/* ACTIVITY */}

                    <input
                        type="text"
                        name="activity"
                        placeholder="Activity"
                        value={itinerary.activity}
                        onChange={handleChange}
                        required
                        disabled={saving}
                    />

                    {/* LOCATION */}

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={itinerary.location}
                        onChange={handleChange}
                        required
                        disabled={saving}
                    />

                    {/* TIME */}

                    <input
                        type="text"
                        name="activityTime"
                        placeholder="Time (10:00 AM)"
                        value={itinerary.activityTime}
                        onChange={handleChange}
                        required
                        disabled={saving}
                    />

                    {/* NOTES */}

                    <textarea
                        name="notes"
                        rows="5"
                        placeholder="Notes"
                        value={itinerary.notes}
                        onChange={handleChange}
                        disabled={saving}
                    />

                    {/* SAVE BUTTON */}

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving Activity..."
                            : "Save Activity"}
                    </button>

                </form>

            </div>

        </div>

    );
}

export default AddItinerary;