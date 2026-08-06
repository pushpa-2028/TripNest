import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddDestination.css";

function AddDestination() {

    const navigate = useNavigate();

    const [destination, setDestination] = useState({
        destinationName: "",
        country: "",
        state: "",
        city: "",
        description: "",
        estimatedBudget: ""
    });

    const handleChange = (e) => {
        setDestination({
            ...destination,
            [e.target.name]: e.target.value
        });
    };

    const saveDestination = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://https://tripnest-fird.onrender.com/api/destinations",
                destination
            );

            alert("Destination Added Successfully!");

            setDestination({
                destinationName: "",
                country: "",
                state: "",
                city: "",
                description: "",
                estimatedBudget: ""
            });

            navigate("/destinations");

        } catch (error) {

            console.log(error);
            alert("Failed to add destination.");

        }

    };

    return (

        <div className="destination-container">

            <div className="destination-card">

                <h2>Add Destination</h2>

                <form onSubmit={saveDestination}>

                    <input
                        type="text"
                        name="destinationName"
                        placeholder="Destination Name"
                        value={destination.destinationName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={destination.country}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={destination.state}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={destination.city}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        rows="5"
                        placeholder="Description"
                        value={destination.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <input
                        type="number"
                        name="estimatedBudget"
                        placeholder="Estimated Budget"
                        value={destination.estimatedBudget}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Save Destination
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddDestination;