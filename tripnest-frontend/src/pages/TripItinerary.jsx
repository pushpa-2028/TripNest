import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../api";

import "../styles/TripItinerary.css";

function TripItinerary() {

    const { id } = useParams();

    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchItineraries();

    }, [id]);

    const fetchItineraries = async () => {

        try {

            console.log(
                "Fetching itinerary for Trip ID:",
                id
            );

            const response = await API.get(
                `/itineraries/trip/${id}`
            );

            console.log(
                "Itinerary response:",
                response.data
            );

            setItineraries(response.data);

        } catch (error) {

            console.error(
                "Error fetching itineraries:",
                error
            );

            setItineraries([]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="itinerary-page">

            <h2>Trip Itinerary</h2>

            <div className="top-bar">

                <Link to={`/trip/${id}/add-itinerary`}>

                    <button className="add-btn">
                        + Add Activity
                    </button>

                </Link>

            </div>

            {loading ? (

                <p>Loading itinerary...</p>

            ) : (

                <table className="itinerary-table">

                    <thead>

                        <tr>
                            <th>Day</th>
                            <th>Activity</th>
                            <th>Location</th>
                            <th>Time</th>
                            <th>Notes</th>
                        </tr>

                    </thead>

                    <tbody>

                        {itineraries.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    No itinerary found.
                                </td>

                            </tr>

                        ) : (

                            itineraries.map((item) => (

                                <tr key={item.id}>

                                    <td>
                                        Day {item.dayNumber}
                                    </td>

                                    <td>
                                        {item.activity}
                                    </td>

                                    <td>
                                        {item.location}
                                    </td>

                                    <td>
                                        {item.activityTime}
                                    </td>

                                    <td>
                                        {item.notes}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default TripItinerary;