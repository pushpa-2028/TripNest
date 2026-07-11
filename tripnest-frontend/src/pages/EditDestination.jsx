import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EditDestination.css";

function EditDestination() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [destination, setDestination] = useState({
        destinationName: "",
        country: "",
        state: "",
        city: "",
        description: "",
        estimatedBudget: ""
    });

    useEffect(() => {
        fetchDestination();
    }, []);

    const fetchDestination = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/destinations/${id}`
            );

            setDestination(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setDestination({
            ...destination,
            [e.target.name]: e.target.value
        });

    };

    const updateDestination = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8080/api/destinations/${id}`,
                destination
            );

            alert("Destination Updated Successfully!");

            navigate("/destinations");

        } catch (error) {

            console.log(error);
            alert("Failed to update destination.");

        }

    };

    return (

        <div className="destination-container">

            <div className="destination-card">

                <h2>Edit Destination</h2>

                <form onSubmit={updateDestination}>

                    <input
                        type="text"
                        name="destinationName"
                        value={destination.destinationName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="country"
                        value={destination.country}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="state"
                        value={destination.state}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        value={destination.city}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        rows="5"
                        name="description"
                        value={destination.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <input
                        type="number"
                        name="estimatedBudget"
                        value={destination.estimatedBudget}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Update Destination
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditDestination;