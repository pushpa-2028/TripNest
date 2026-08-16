import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    FaMapMarkerAlt,
    FaGlobeAmericas,
    FaMap,
    FaCity,
    FaAlignLeft,
    FaWallet
} from "react-icons/fa";

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


    const [error, setError] = useState("");


    // =====================================
    // HANDLE INPUT
    // =====================================

    const handleChange = (e) => {

        setDestination({
            ...destination,
            [e.target.name]: e.target.value
        });

        setError("");

    };


    // =====================================
    // SAVE DESTINATION
    // =====================================

    const saveDestination = async (e) => {

        e.preventDefault();


        // BASIC VALIDATION

        if (!destination.destinationName.trim()) {
            setError("Please enter a destination name.");
            return;
        }

        if (!destination.country.trim()) {
            setError("Please enter a country.");
            return;
        }

        if (!destination.state.trim()) {
            setError("Please enter a state.");
            return;
        }

        if (!destination.city.trim()) {
            setError("Please enter a city.");
            return;
        }

        if (!destination.description.trim()) {
            setError("Please enter a description.");
            return;
        }

        if (
            !destination.estimatedBudget ||
            Number(destination.estimatedBudget) <= 0
        ) {
            setError("Estimated budget must be greater than ₹0.");
            return;
        }


        try {

            await axios.post(
                "https://tripnest-fird.onrender.com/api/destinations",
                {
                    ...destination,
                    estimatedBudget:
                        Number(destination.estimatedBudget)
                }
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


            setError("");


            navigate("/destinations");


        } catch (error) {

            console.log("Add destination error:", error);

            setError(
                "Failed to add destination. Please try again."
            );

        }

    };


    return (

        <div className="add-destination-page">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="add-destination-header">

                <div className="add-destination-header-icon">

                    <FaMapMarkerAlt />

                </div>


                <h1>
                    Add New Destination
                </h1>


                <p>
                    Add a beautiful destination to your TripNest collection.
                </p>

            </div>


            {/* =====================================
                FORM CARD
            ===================================== */}

            <div className="add-destination-card">


                {/* ERROR */}

                {error && (

                    <div className="destination-error">

                        {error}

                    </div>

                )}


                <form onSubmit={saveDestination}>


                    {/* DESTINATION NAME */}

                    <div className="destination-field">

                        <label>
                            Destination Name
                        </label>

                        <div className="destination-input">

                            <FaMapMarkerAlt />

                            <input
                                type="text"
                                name="destinationName"
                                placeholder="e.g. Sakaleshpura"
                                value={
                                    destination.destinationName
                                }
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* COUNTRY */}

                    <div className="destination-field">

                        <label>
                            Country
                        </label>

                        <div className="destination-input">

                            <FaGlobeAmericas />

                            <input
                                type="text"
                                name="country"
                                placeholder="e.g. India"
                                value={
                                    destination.country
                                }
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* STATE */}

                    <div className="destination-field">

                        <label>
                            State
                        </label>

                        <div className="destination-input">

                            <FaMap />

                            <input
                                type="text"
                                name="state"
                                placeholder="e.g. Karnataka"
                                value={
                                    destination.state
                                }
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* CITY */}

                    <div className="destination-field">

                        <label>
                            City
                        </label>

                        <div className="destination-input">

                            <FaCity />

                            <input
                                type="text"
                                name="city"
                                placeholder="e.g. Sakaleshpura"
                                value={
                                    destination.city
                                }
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="destination-field">

                        <label>
                            Description
                        </label>

                        <div className="destination-input textarea-input">

                            <FaAlignLeft />

                            <textarea
                                name="description"
                                rows="5"
                                placeholder="Describe this destination..."
                                value={
                                    destination.description
                                }
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* BUDGET */}

                    <div className="destination-field">

                        <label>
                            Estimated Budget
                        </label>

                        <div className="destination-input">

                            <FaWallet />

                            <input
                                type="number"
                                name="estimatedBudget"
                                placeholder="e.g. 10000"
                                value={
                                    destination.estimatedBudget
                                }
                                onChange={handleChange}
                                min="1"
                            />

                        </div>

                    </div>


                    {/* BUTTONS */}

                    <div className="destination-form-actions">

                        <button
                            type="button"
                            className="cancel-destination-btn"
                            onClick={() =>
                                navigate("/destinations")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-destination-btn"
                        >
                            <FaMapMarkerAlt />

                            Save Destination
                        </button>

                    </div>


                </form>

            </div>


        </div>

    );

}


export default AddDestination;