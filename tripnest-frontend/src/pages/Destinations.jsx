import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Destinations.css";

function Destinations() {

    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/destinations"
            );

            setDestinations(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const editDestination = (id) => {
        navigate(`/edit-destination/${id}`);
    };

    const deleteDestination = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this destination?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/api/destinations/${id}`
            );

            alert("Destination deleted successfully!");

            fetchDestinations();

        } catch (error) {

            console.log(error);
            alert("Failed to delete destination.");

        }

    };

    return (

        <div className="destinations-container">

            <h2>Popular Destinations</h2>

            <table className="destination-table">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Destination</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {destinations.length === 0 ? (

                        <tr>
                            <td colSpan="8">
                                No destinations available.
                            </td>
                        </tr>

                    ) : (

                        destinations.map((destination) => (

                            <tr key={destination.id}>

                                <td>{destination.id}</td>
                                <td>{destination.destinationName}</td>
                                <td>{destination.country}</td>
                                <td>{destination.state}</td>
                                <td>{destination.city}</td>
                                <td>{destination.description}</td>
                                <td>₹{destination.estimatedBudget}</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => editDestination(destination.id)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteDestination(destination.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default Destinations;