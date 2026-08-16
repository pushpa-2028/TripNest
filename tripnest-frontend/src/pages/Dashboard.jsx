import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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

  // =====================================
  // DASHBOARD DATA
  // =====================================

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // FETCH DASHBOARD DATA
  // ONE API REQUEST ONLY
  // =====================================

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/dashboard");
        if (isMounted) {
          setDashboardData(response.data);
        }
      } catch (err) {
        console.error("Dashboard API error:", err);

        if (isMounted) {
          setError(
            "Unable to load dashboard data. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  // =====================================
  // LOADING SCREEN
  // =====================================

  if (loading) {
    return (
      <div className="dashboard">

        <div className="dashboard-header">
          <h1>TripNest Dashboard</h1>

          <p>
            Loading your travel dashboard...
          </p>
        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card trips-card">
            <div className="card-icon">
              <FaPlaneDeparture />
            </div>

            <div>
              <h2>...</h2>
              <p>Total Trips</p>
            </div>
          </div>

          <div className="dashboard-card destination-card">
            <div className="card-icon">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h2>...</h2>
              <p>Destinations</p>
            </div>
          </div>

          <div className="dashboard-card upcoming-card">
            <div className="card-icon">
              <FaCalendarAlt />
            </div>

            <div>
              <h2>...</h2>
              <p>Upcoming Trips</p>
            </div>
          </div>

          <div className="dashboard-card budget-card">
            <div className="card-icon">
              <FaWallet />
            </div>

            <div>
              <h2>...</h2>
              <p>Total Budget</p>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // =====================================
  // ERROR SCREEN
  // =====================================

  if (error || !dashboardData) {
    return (
      <div className="dashboard">

        <div className="dashboard-header">
          <h1>TripNest Dashboard</h1>

          <p>
            {error || "No dashboard data available."}
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "40px"
          }}
        >
          <button
            className="action-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>

      </div>
    );
  }

  // =====================================
  // GET DATA FROM BACKEND
  // =====================================

  const totalTrips =
    dashboardData.totalTrips || 0;

  const totalDestinations =
    dashboardData.totalDestinations || 0;

  const upcomingTrips =
    dashboardData.upcomingTrips || 0;

  const totalBudget =
    Number(dashboardData.totalBudget || 0);

  const totalExpenses =
    Number(dashboardData.totalExpenses || 0);

  const remainingBudget =
    Number(dashboardData.remainingBudget || 0);

  const budgetUsedPercentage =
    Number(
      dashboardData.budgetUsedPercentage || 0
    );

  const trips =
    dashboardData.trips || [];

  const categoryTotals =
    dashboardData.categoryTotals || {};

  // =====================================
  // DASHBOARD ANALYTICS
  // =====================================

  const completedTrips = Math.max(
  totalTrips - upcomingTrips,
  0
);

const tripStatusData = [
  {
    name: "Completed",
    value: completedTrips
  },
  {
    name: "Upcoming",
    value: upcomingTrips
  }
];

  // =====================================
  // BUDGET REPORT
  // =====================================

 const budgetChartData = [
  {
    name: "Budget",
    expenses: totalExpenses,
    remaining: remainingBudget
  }
];
  // =====================================
  // EXPENSE CATEGORY REPORT
  // =====================================

  const categoryChartData =
    Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        name: category,
        value: Number(amount || 0)
      })
    );

  // =====================================
  // PIE CHART COLORS
  // =====================================

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

  // =====================================
  // MAIN DASHBOARD
  // =====================================

  return (
    <div className="dashboard">

      {/* =====================================
    DASHBOARD HEADER
===================================== */}

<div className="dashboard-header">

  <div className="dashboard-header-content">

    <div className="dashboard-header-text">

      <span className="dashboard-eyebrow">
        YOUR TRAVEL SPACE
      </span>

      <h1>
        TripNest Dashboard
      </h1>

      <p>
        Plan smarter, track your journeys,
        and keep every travel detail in one place.
      </p>

    </div>

    <div className="dashboard-header-icon">
      <FaPlaneDeparture />
    </div>

  </div>

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

    <div className="card-content">

      <p className="card-label">
        Total Trips
      </p>

      <h2>
        {totalTrips}
      </h2>

      <small>
        All your journeys
      </small>

    </div>

  </div>


  {/* DESTINATIONS */}

  <div className="dashboard-card destination-card">

    <div className="card-icon">
      <FaMapMarkerAlt />
    </div>

    <div className="card-content">

      <p className="card-label">
        Destinations
      </p>

      <h2>
        {totalDestinations}
      </h2>

      <small>
        Places you've explored
      </small>

    </div>

  </div>


  {/* UPCOMING TRIPS */}

  <div className="dashboard-card upcoming-card">

    <div className="card-icon">
      <FaCalendarAlt />
    </div>

    <div className="card-content">

      <p className="card-label">
        Upcoming Trips
      </p>

      <h2>
        {upcomingTrips}
      </h2>

      <small>
        Trips coming soon
      </small>

    </div>

  </div>


  {/* TOTAL BUDGET */}

  <div className="dashboard-card budget-card">

    <div className="card-icon">
      <FaWallet />
    </div>

    <div className="card-content">

      <p className="card-label">
        Total Budget
      </p>

      <h2>
        ₹{totalBudget.toLocaleString()}
      </h2>

      <small>
        Planned travel budget
      </small>

    </div>

  </div>

</div>


      {/* =====================================
    QUICK ACTIONS
===================================== */}

<div className="quick-actions">

  <div className="quick-actions-header">

    <div>
      <h2>Quick Actions</h2>

      <p>
        Manage your travel plans quickly
      </p>
    </div>

  </div>


  <div className="action-grid">

    {/* CREATE TRIP */}

    <button
      className="action-btn create-action"
      onClick={() =>
        navigate("/create-trip")
      }
    >

      <div className="action-icon">
        <FaPlusCircle />
      </div>

      <div className="action-content">

        <strong>
          Create Trip
        </strong>

        <span>
          Plan a new journey
        </span>

      </div>

      <span className="action-arrow">
        →
      </span>

    </button>


    {/* MY TRIPS */}

    <button
      className="action-btn trips-action"
      onClick={() =>
        navigate("/my-trips")
      }
    >

      <div className="action-icon">
        <FaSuitcase />
      </div>

      <div className="action-content">

        <strong>
          My Trips
        </strong>

        <span>
          View your journeys
        </span>

      </div>

      <span className="action-arrow">
        →
      </span>

    </button>


    {/* DESTINATIONS */}

    <button
      className="action-btn destinations-action"
      onClick={() =>
        navigate("/destinations")
      }
    >

      <div className="action-icon">
        <FaGlobe />
      </div>

      <div className="action-content">

        <strong>
          Destinations
        </strong>

        <span>
          Explore new places
        </span>

      </div>

      <span className="action-arrow">
        →
      </span>

    </button>


    {/* EXPENSES */}

    <button
      className="action-btn expenses-action"
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

      <div className="action-icon">
        <FaMoneyBillWave />
      </div>

      <div className="action-content">

        <strong>
          Expenses
        </strong>

        <span>
          Track your spending
        </span>

      </div>

      <span className="action-arrow">
        →
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
          <ResponsiveContainer
  width="100%"
  height={300}
>
  <PieChart>

    <Pie
      data={tripStatusData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      innerRadius={75}
      outerRadius={105}
      paddingAngle={4}
      stroke="none"
    >

      <Cell fill="#1565c0" />

      <Cell fill="#42a5f5" />

    </Pie>

    <Tooltip
      formatter={(value, name) => [
        value,
        name
      ]}
      contentStyle={{
        borderRadius: "12px",
        border: "1px solid #e5edf7",
        boxShadow:
          "0 8px 20px rgba(15, 23, 42, 0.10)"
      }}
    />

    <text
      x="50%"
      y="47%"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#111827"
      fontSize="26"
      fontWeight="700"
    >
      {totalTrips}
    </text>

    <text
      x="50%"
      y="56%"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#6b7280"
      fontSize="13"
    >
      Total Trips
    </text>

  </PieChart>
</ResponsiveContainer>
<div className="trip-status-summary">

  <div className="trip-status-item">

    <span className="status-dot completed-dot"></span>

    <div>
      <strong>
        {completedTrips}
      </strong>

      <span>
        Completed
      </span>
    </div>

  </div>


  <div className="trip-status-item">

    <span className="status-dot upcoming-dot"></span>

    <div>
      <strong>
        {upcomingTrips}
      </strong>

      <span>
        Upcoming
      </span>
    </div>

  </div>

</div>

          <h2>
            Dashboard Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart
  data={tripStatusData}
  margin={{
    top: 10,
    right: 20,
    left: 0,
    bottom: 10
  }}
>
  <CartesianGrid
  stroke="#d7dee8"
  strokeDasharray="4 4"
  vertical={false}
/>

  <XAxis
  dataKey="name"
  tick={{
    fill: "#475569",
    fontSize: 14
  }}
  axisLine={{
    stroke: "#cbd5e1"
  }}
  tickLine={{
    stroke: "#cbd5e1"
  }}
/>

<YAxis
  tick={{
    fill: "#475569",
    fontSize: 13
  }}
  axisLine={{
    stroke: "#cbd5e1"
  }}
  tickLine={{
    stroke: "#cbd5e1"
  }}
/>

  <Tooltip
    cursor={{
      fill: "rgba(21, 101, 192, 0.05)"
    }}
    contentStyle={{
      borderRadius: "12px",
      border: "1px solid #e5edf7",
      boxShadow: "0 8px 20px rgba(15, 23, 42, 0.10)"
    }}
    formatter={(value) => [
      value,
      "Count"
    ]}
  />

  <Bar
    dataKey="value"
    fill="#1565c0"
    radius={[
      10,
      10,
      0,
      0
    ]}
    barSize={70}
  />
</BarChart>

          </ResponsiveContainer>

        </div>


        {/* =====================================
    RECENT TRIPS
===================================== */}

<div className="recent-card">

  <div className="section-title">

    <div className="section-heading">

      <h2>
        Recent Trips
      </h2>

      <p>
        Your latest travel plans
      </p>

    </div>

    <span className="trip-count">
      {totalTrips} Trips
    </span>

  </div>


  <div className="recent-trips-list">

    {trips.length > 0 ? (

      trips.map((trip) => (

        <div
          className="recent-trip-item"
          key={trip.id}
        >

          {/* TRIP ICON */}

          <div className="recent-trip-icon">
            <FaPlaneDeparture />
          </div>


          {/* TRIP INFORMATION */}

          <div className="recent-trip-info">

            <h3>
              {trip.tripName}
            </h3>

            <p>
              <FaMapMarkerAlt />
              {trip.destination}
            </p>

          </div>


          {/* BUDGET */}

          <div className="recent-trip-budget">

            <span>
              Budget
            </span>

            <strong>
              ₹
              {Number(
                trip.budget || 0
              ).toLocaleString()}
            </strong>

          </div>

        </div>

      ))

    ) : (

      <div className="recent-trips-empty">

        <FaSuitcase />

        <h3>
          No trips yet
        </h3>

        <p>
          Create your first trip to see it here.
        </p>

      </div>

    )}

  </div>

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
              ₹
              {totalBudget.toLocaleString()}
            </h3>

          </div>


          <div className="summary-box">

            <p>
              Total Expenses
            </p>

            <h3>
              ₹
              {totalExpenses.toLocaleString()}
            </h3>

          </div>


          <div className="summary-box">

            <p>
              Remaining Budget
            </p>

            <h3>
              ₹
              {remainingBudget.toLocaleString()}
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

  <div className="budget-chart-header">
    <div>
      <h3>Budget Utilization</h3>

      <p>
        Track how much of your total budget has been spent.
      </p>
    </div>

    <div className="budget-percentage">
      {budgetUsedPercentage.toFixed(1)}%
      <span>used</span>
    </div>
  </div>

  <ResponsiveContainer
    width="100%"
    height={180}
  >

    <BarChart
      data={budgetChartData}
      layout="vertical"
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 20
      }}
    >

      <CartesianGrid
        horizontal={false}
        vertical={false}
      />

      <XAxis
        type="number"
        hide
        domain={[
          0,
          totalBudget
        ]}
      />

      <YAxis
        type="category"
        dataKey="name"
        hide
      />

      <Tooltip
        formatter={(value, name) => [
          `₹${Number(value).toLocaleString()}`,
          name === "expenses"
            ? "Expenses"
            : "Remaining"
        ]}
      />

      <Bar
        dataKey="expenses"
        stackId="budget"
        fill="#ef4444"
        radius={[
          12,
          0,
          0,
          12
        ]}
        barSize={55}
      />

      <Bar
        dataKey="remaining"
        stackId="budget"
        fill="#dbeafe"
        radius={[
          0,
          12,
          12,
          0
        ]}
        barSize={55}
      />

    </BarChart>

  </ResponsiveContainer>

  <div className="budget-chart-legend">

    <div className="budget-legend-item">
      <span className="legend-dot expenses-dot"></span>

      <div>
        <strong>
          ₹{totalExpenses.toLocaleString()}
        </strong>

        <span>
          Expenses
        </span>
      </div>
    </div>

    <div className="budget-legend-item">
      <span className="legend-dot remaining-dot"></span>

      <div>
        <strong>
          ₹{remainingBudget.toLocaleString()}
        </strong>

        <span>
          Remaining
        </span>
      </div>
    </div>

  </div>

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
    innerRadius={65}
    paddingAngle={3}
  >

    {categoryChartData.map(
      (entry, index) => (

        <Cell
          key={`cell-${index}`}
          fill={
            COLORS[
              index %
              COLORS.length
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

  <text
    x="50%"
    y="47%"
    textAnchor="middle"
    dominantBaseline="middle"
    fill="#111827"
    fontSize="22"
    fontWeight="700"
  >
    ₹{totalExpenses.toLocaleString()}
  </text>

  <text
    x="50%"
    y="55%"
    textAnchor="middle"
    dominantBaseline="middle"
    fill="#6b7280"
    fontSize="12"
  >
    Total Expenses
  </text>

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
                              index %
                              COLORS.length
                            ]
                        }}
                      />

                      <span>
                        {category.name}
                      </span>

                    </div>

                    <strong>
                      ₹
                      {Number(
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