import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

    useEffect(() => {
        getTrip();
    }, []);

    const getTrip = async () => {

        try {

            const response = await axios.get(
                `https://tripnest-fird.onrender.com/api/trips/${id}`
            );

            setTrip(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to load trip.");

        }

    };

    const handleChange = (e) => {

        setTrip({
            ...trip,
            [e.target.name]: e.target.value
        });

    };

    const updateTrip = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `https://tripnest-fird.onrender.com/api/trips/${id}`,
                trip
            );

            alert("Trip Updated Successfully!");

            navigate("/my-trips");

        } catch (error) {

            console.log(error);
            alert("Failed to update trip.");

        }

    };

    return (

        <div className="edit-trip-container">

            <div className="edit-trip-card">

                <h2>Edit Trip</h2>

                <form onSubmit={updateTrip}>

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
                        rows="5"
                        placeholder="Trip Description"
                        value={trip.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit">
                        Update Trip
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditTrip;
