import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import MyTrips from "./pages/MyTrips";
import EditTrip from "./pages/EditTrip";
import AddItinerary from "./pages/AddItinerary";
import TripItinerary from "./pages/TripItinerary";
import AddDestination from "./pages/AddDestination";
import Destinations from "./pages/Destinations";
import EditDestination from "./pages/EditDestination";
import NotFound from "./pages/NotFound";

import "./styles/App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/edit-trip/:id" element={<EditTrip />} />

        <Route path="/trip/:id/itinerary" element={<TripItinerary />} />
        <Route path="/trip/:id/add-itinerary" element={<AddItinerary />} />

        <Route path="/add-destination" element={<AddDestination />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route
          path="/edit-destination/:id"
          element={<EditDestination />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;