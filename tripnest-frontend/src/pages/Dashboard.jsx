import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaPlaneDeparture,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaPlusCircle,
  FaSuitcase,
  FaMoneyBillWave,
  FaGlobe
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =====================================
  // FETCH DASHBOARD DATA
  // =====================================

  const fetchDashboardData = async () => {

    try {

      const tripResponse = await axios.get(
        "http://localhost:8080/api/trips"
      );

      const tripData = tripResponse.data || [];

      setTrips(tripData);

      if (tripData.length === 0) {
        setExpenses([]);
        return;
      }

      const expenseRequests = tripData.map((trip) =>
        axios.get(
          `http://localhost:8080/api/expenses/trip/${trip.id}`
        )
      );

      const expenseResponses = await Promise.all(
        expenseRequests
      );

      const allExpenses = expenseResponses.flatMap(
        (response) => response.data || []
      );

      setExpenses(allExpenses);

    } catch (error) {

      console.log(
        "Dashboard data error:",
        error
      );

    }
  };


  // =====================================
  // DASHBOARD CALCULATIONS
  // =====================================

  const today = new Date();

  const totalTrips = trips.length;

  const totalDestinations = new Set(
    trips.map((trip) => trip.destination)
  ).size;

  const upcomingTrips = trips.filter(
    (trip) => new Date(trip.startDate) >= today
  ).length;

  const totalBudget = trips.reduce(
    (sum, trip) =>
      sum + Number(trip.budget || 0),
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount || 0),
    0
  );

  const remainingBudget =
    totalBudget - totalExpenses;

  const budgetUsedPercentage =
    totalBudget > 0
      ? (totalExpenses / totalBudget) * 100
      : 0;


  // =====================================
  // DASHBOARD ANALYTICS DATA
  // =====================================

  const chartData = [
    {
      name: "Trips",
      value: totalTrips
    },
    {
      name: "Destinations",
      value: totalDestinations
    },
    {
      name: "Upcoming",
      value: upcomingTrips
    }
  ];


  // =====================================
  // BUDGET REPORT DATA
  // =====================================

  const budgetChartData = [
    {
      name: "Budget",
      amount: totalBudget
    },
    {
      name: "Expenses",
      amount: totalExpenses
    },
    {
      name: "Remaining",
      amount: remainingBudget
    }
  ];


  // =====================================
  // EXPENSE CATEGORY DATA
  // =====================================

  const categoryTotals = expenses.reduce(
    (result, expense) => {

      const category =
        expense.category || "Other";

      const amount =
        Number(expense.amount || 0);

      if (result[category]) {

        result[category] += amount;

      } else {

        result[category] = amount;

      }

      return result;

    },
    {}
  );


  const categoryChartData =
    Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        name: category,
        value: amount
      })
    );


  // Pie Chart Colors
  const COLORS = [
    "#1565c0",
    "#009688",
    "#fb8c00",
    "#8e24aa",
    "#e53935",
    "#43a047",
    "#00acc1",
    "#f4511e"
  ];


  return (

    <div className="dashboard">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="dashboard-header">

        <h1>
          TripNest Dashboard
        </h1>

        <p>
          Welcome back! Manage your trips,
          budgets, destinations and travel
          plans from one place.
        </p>

      </div>


      {/* =====================================
          STATISTICS CARDS
      ===================================== */}

      <div className="dashboard-cards">


        {/* TOTAL TRIPS */}

        <div className="dashboard-card trips-card">

          <div className="card-icon">
            <FaPlaneDeparture />
          </div>

          <div>

            <h2>
              {totalTrips}
            </h2>

            <p>
              Total Trips
            </p>

          </div>

        </div>


        {/* DESTINATIONS */}

        <div className="dashboard-card destination-card">

          <div className="card-icon">
            <FaMapMarkerAlt />
          </div>

          <div>

            <h2>
              {totalDestinations}
            </h2>

            <p>
              Destinations
            </p>

          </div>

        </div>


        {/* UPCOMING TRIPS */}

        <div className="dashboard-card upcoming-card">

          <div className="card-icon">
            <FaCalendarAlt />
          </div>

          <div>

            <h2>
              {upcomingTrips}
            </h2>

            <p>
              Upcoming Trips
            </p>

          </div>

        </div>


        {/* TOTAL BUDGET */}

        <div className="dashboard-card budget-card">

          <div className="card-icon">
            <FaWallet />
          </div>

          <div>

            <h2>
              ₹{totalBudget.toLocaleString()}
            </h2>

            <p>
              Total Budget
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          QUICK ACTIONS
      ===================================== */}

      <div className="quick-actions">

        <h2>
          Quick Actions
        </h2>

        <div className="action-grid">


          <button
            className="action-btn"
            onClick={() =>
              navigate("/create-trip")
            }
          >

            <FaPlusCircle />

            <span>
              Create Trip
            </span>

          </button>


          <button
            className="action-btn"
            onClick={() =>
              navigate("/my-trips")
            }
          >

            <FaSuitcase />

            <span>
              My Trips
            </span>

          </button>


          <button
            className="action-btn"
            onClick={() =>
              navigate("/destinations")
            }
          >

            <FaGlobe />

            <span>
              Destinations
            </span>

          </button>


          <button
            className="action-btn"

            onClick={() => {

              if (trips.length > 0) {

                navigate(
                  `/trip/${trips[0].id}/expenses`
                );

              } else {

                alert(
                  "Please create a trip first."
                );

              }

            }}
          >

            <FaMoneyBillWave />

            <span>
              Expenses
            </span>

          </button>

        </div>

      </div>


      {/* =====================================
          MAIN ANALYTICS GRID
      ===================================== */}

      <div className="dashboard-grid">


        {/* DASHBOARD ANALYTICS */}

        <div className="analytics-card">

          <h2>
            Dashboard Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={chartData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#1565c0"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* =====================================
            RECENT TRIPS
        ===================================== */}

        <div className="recent-card">

          <div className="section-title">

            <h2>
              Recent Trips
            </h2>

            <span>
              {totalTrips} Trips
            </span>

          </div>


          <table>

            <thead>

              <tr>

                <th>
                  Trip
                </th>

                <th>
                  Destination
                </th>

                <th>
                  Budget
                </th>

              </tr>

            </thead>


            <tbody>

              {trips.length > 0 ? (

                trips.map((trip) => (

                  <tr key={trip.id}>

                    <td>
                      {trip.tripName}
                    </td>

                    <td>
                      {trip.destination}
                    </td>

                    <td>

                      ₹{Number(
                        trip.budget || 0
                      ).toLocaleString()}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="3">

                    No trips available.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================
          BUDGET & EXPENSE REPORT
      ===================================== */}

      <div className="budget-report">

        <h2>
          Budget & Expense Report
        </h2>


        <div className="budget-summary">


          <div className="summary-box">

            <p>
              Total Budget
            </p>

            <h3>
              ₹{totalBudget.toLocaleString()}
            </h3>

          </div>


          <div className="summary-box">

            <p>
              Total Expenses
            </p>

            <h3>
              ₹{totalExpenses.toLocaleString()}
            </h3>

          </div>


          <div className="summary-box">

            <p>
              Remaining Budget
            </p>

            <h3>
              ₹{remainingBudget.toLocaleString()}
            </h3>

          </div>


          <div className="summary-box">

            <p>
              Budget Used
            </p>

            <h3>
              {budgetUsedPercentage.toFixed(1)}%
            </h3>

          </div>

        </div>


        {/* BUDGET CHART */}

        <div className="budget-chart">

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
              data={budgetChartData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString()}`
                }
              />

              <Bar
                dataKey="amount"
                fill="#1565c0"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* =====================================
          EXPENSE CATEGORY REPORT
      ===================================== */}

      <div className="category-report">

        <h2>
          Expense Category Report
        </h2>

        {categoryChartData.length > 0 ? (

          <div className="category-report-content">


            {/* PIE CHART */}

            <div className="category-chart">

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <PieChart>

                  <Pie
                    data={categoryChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >

                    {categoryChartData.map(
                      (entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index % COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(
                        value
                      ).toLocaleString()}`
                    }
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>


            {/* CATEGORY DETAILS */}

            <div className="category-list">

              {categoryChartData.map(
                (category, index) => (

                  <div
                    className="category-item"
                    key={category.name}
                  >

                    <div className="category-name">

                      <span
                        className="category-color"
                        style={{
                          backgroundColor:
                            COLORS[
                              index % COLORS.length
                            ]
                        }}
                      >
                      </span>

                      <span>
                        {category.name}
                      </span>

                    </div>

                    <strong>
                      ₹{Number(
                        category.value
                      ).toLocaleString()}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>

        ) : (

          <div className="no-category-data">

            <p>
              No expense data available.
            </p>

            <span>
              Add expenses to your trips to view
              the category report.
            </span>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;