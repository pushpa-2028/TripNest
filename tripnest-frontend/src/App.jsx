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

import TripDetails from "./pages/TripDetails";

import AddItinerary from "./pages/AddItinerary";
import TripItinerary from "./pages/TripItinerary";

import AddDestination from "./pages/AddDestination";
import Destinations from "./pages/Destinations";
import EditDestination from "./pages/EditDestination";
import DestinationDetails from "./pages/DestinationDetails";

import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";

import TripMembers from "./pages/TripMembers";
import Documents from "./pages/Documents";

import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

import NotFound from "./pages/NotFound";

import "./styles/App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* =====================================
            GENERAL
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* =====================================
            PROFILE
        ===================================== */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =====================================
            NOTIFICATIONS
        ===================================== */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* =====================================
            TRIPS
        ===================================== */}

        <Route
          path="/create-trip"
          element={<CreateTrip />}
        />

        <Route
          path="/my-trips"
          element={<MyTrips />}
        />

        <Route
          path="/edit-trip/:id"
          element={<EditTrip />}
        />

        {/* ⭐ MAIN TRIP DETAILS PAGE */}

        <Route
          path="/trip/:id"
          element={<TripDetails />}
        />

        {/* =====================================
            ITINERARY
        ===================================== */}

        <Route
          path="/trip/:id/itinerary"
          element={<TripItinerary />}
        />

        <Route
          path="/trip/:id/add-itinerary"
          element={<AddItinerary />}
        />

        {/* =====================================
            EXPENSES
        ===================================== */}

        <Route
          path="/trip/:id/expenses"
          element={<Expenses />}
        />

        <Route
          path="/trip/:id/add-expense"
          element={<AddExpense />}
        />

        <Route
          path="/edit-expense/:id"
          element={<EditExpense />}
        />

        {/* =====================================
            MEMBERS
        ===================================== */}

        <Route
          path="/trip/:id/members"
          element={<TripMembers />}
        />

        {/* =====================================
            DOCUMENTS
        ===================================== */}

        <Route
          path="/trip/:id/documents"
          element={<Documents />}
        />

        {/* =====================================
            DESTINATIONS
        ===================================== */}

        <Route
          path="/add-destination"
          element={<AddDestination />}
        />

        <Route
          path="/destinations"
          element={<Destinations />}
        />

        <Route
          path="/edit-destination/:id"
          element={<EditDestination />}
        />

        {/* ⭐ DESTINATION DETAILS */}

        <Route
          path="/destination/:id"
          element={<DestinationDetails />}
        />

        {/* =====================================
            404
        ===================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;