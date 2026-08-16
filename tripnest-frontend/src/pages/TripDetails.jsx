import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

import {
  FaArrowLeft,
  FaEdit,
  FaMapMarkerAlt,
  FaCalendarAlt,
   FaCompass,
  FaWallet,
  FaUsers,
  FaRoute,
  FaMoneyBillWave,
  FaFileAlt,
  FaPlus,
  FaChevronRight,
  FaClock,
  FaCheckCircle,
  FaPlaneDeparture,
  FaDownload
} from "react-icons/fa";

import "../styles/TripDetails.css";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080/api";

  const [trip, setTrip] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    budget: 0,
    totalExpense: 0,
    remainingBudget: 0,
    percentageUsed: 0
  });
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // FETCH ALL TRIP DETAILS
  // =========================================

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        tripResponse,
        itineraryResponse,
        expenseResponse,
        summaryResponse,
        memberResponse
      ] = await Promise.allSettled([
        axios.get(`${API_URL}/trips/${id}`),

        axios.get(
          `${API_URL}/itineraries/trip/${id}`
        ),

        axios.get(
          `${API_URL}/expenses/trip/${id}`
        ),

        axios.get(
          `${API_URL}/expenses/summary/${id}`
        ),

        axios.get(
          `${API_URL}/trip-members/trip/${id}`
        )
      ]);

      // Trip
      if (
        tripResponse.status === "fulfilled"
      ) {
        setTrip(tripResponse.value.data);
      } else {
        throw new Error(
          "Unable to load trip."
        );
      }

      // Itinerary
      if (
        itineraryResponse.status === "fulfilled"
      ) {
        setItineraries(
          itineraryResponse.value.data || []
        );
      }

      // Expenses
      if (
        expenseResponse.status === "fulfilled"
      ) {
        setExpenses(
          expenseResponse.value.data || []
        );
      }

      // Summary
      if (
        summaryResponse.status === "fulfilled"
      ) {
        setSummary(
          summaryResponse.value.data || {
            budget: 0,
            totalExpense: 0,
            remainingBudget: 0,
            percentageUsed: 0
          }
        );
      }

      // Members
      if (
        memberResponse.status === "fulfilled"
      ) {
        setMembers(
          memberResponse.value.data || []
        );
      }

    } catch (error) {
      console.error(
        "Trip details error:",
        error
      );

      setError(
        "Unable to load trip details."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // STATUS
  // =========================================

  const getTripStatus = () => {
    if (!trip) return "Upcoming";

    const today = new Date();
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);

    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (today < start) {
      return "Upcoming";
    }

    if (
      today >= start &&
      today <= end
    ) {
      return "Ongoing";
    }

    return "Completed";
  };

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) return "Not available";

    const value = new Date(date);

    if (Number.isNaN(value.getTime())) {
      return date;
    }

    return value.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  // =========================================
  // FORMAT CURRENCY
  // =========================================

  const currency = (value) => {
    return `₹${Number(
      value || 0
    ).toLocaleString("en-IN")}`;
  };

  // =========================================
  // DOWNLOAD PROFESSIONAL PDF
  // =========================================

  const downloadPDF = () => {
    if (!trip) return;

    const doc = new jsPDF();

    const pageWidth =
      doc.internal.pageSize.getWidth();

    const pageHeight =
      doc.internal.pageSize.getHeight();

    const status = getTripStatus();

    // -----------------------------------------
    // COLORS
    // -----------------------------------------

    const primary = [79, 70, 229];
    const secondary = [99, 102, 241];
    const dark = [31, 41, 55];
    const gray = [107, 114, 128];
    const light = [245, 247, 255];
    const green = [5, 150, 105];
    const red = [220, 38, 38];

    // -----------------------------------------
    // HELPER
    // -----------------------------------------

    const addFooter = () => {
      doc.setDrawColor(
        225,
        228,
        238
      );

      doc.line(
        20,
        pageHeight - 18,
        pageWidth - 20,
        pageHeight - 18
      );

      doc.setFontSize(8);
      doc.setTextColor(
        120,
        120,
        120
      );

      doc.text(
        "TripNest • Explore Beyond Limits",
        20,
        pageHeight - 10
      );

      doc.text(
        `Page ${doc.getNumberOfPages()}`,
        pageWidth - 35,
        pageHeight - 10
      );
    };

    const addNewPageIfNeeded = (
      requiredHeight = 30
    ) => {
      if (
        currentY + requiredHeight >
        pageHeight - 28
      ) {
        addFooter();
        doc.addPage();
        currentY = 25;
      }
    };

    let currentY = 0;

    // =========================================
    // COVER / HEADER
    // =========================================

    doc.setFillColor(
      ...primary
    );

    doc.rect(
      0,
      0,
      pageWidth,
      55,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(26);

    doc.text(
      "TripNest",
      20,
      23
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(10);

    doc.text(
      "EXPLORE BEYOND LIMITS",
      20,
      34
    );

    doc.setFontSize(9);

    doc.text(
      "Your Personal Trip Guide",
      pageWidth - 20,
      27,
      {
        align: "right"
      }
    );

    // =========================================
    // GREETING
    // =========================================

    currentY = 75;

    doc.setTextColor(
      ...dark
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(20);

    doc.text(
      `Hello, Traveler! 👋`,
      20,
      currentY
    );

    currentY += 10;

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(11);

    doc.setTextColor(
      ...gray
    );

    doc.text(
      "Your journey is about to become a beautiful memory.",
      20,
      currentY
    );

    currentY += 7;

    doc.text(
      "Here is your complete TripNest travel plan.",
      20,
      currentY
    );

    // =========================================
    // TRIP TITLE CARD
    // =========================================

    currentY += 18;

    doc.setFillColor(
      ...light
    );

    doc.roundedRect(
      20,
      currentY,
      pageWidth - 40,
      58,
      5,
      5,
      "F"
    );

    doc.setTextColor(
      ...primary
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(22);

    doc.text(
      trip.tripName || "My Trip",
      30,
      currentY + 18
    );

    doc.setFontSize(11);

    doc.setTextColor(
      ...dark
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      `📍 ${trip.destination || "Destination"}`,
      30,
      currentY + 31
    );

    doc.text(
      `${formatDate(
        trip.startDate
      )}  →  ${formatDate(
        trip.endDate
      )}`,
      30,
      currentY + 43
    );

    // Status badge

    const statusColor =
      status === "Completed"
        ? gray
        : status === "Ongoing"
        ? green
        : primary;

    doc.setFillColor(
      ...statusColor
    );

    doc.roundedRect(
      pageWidth - 72,
      currentY + 12,
      40,
      10,
      5,
      5,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(8);

    doc.text(
      status,
      pageWidth - 52,
      currentY + 18.5,
      {
        align: "center"
      }
    );

    currentY += 72;

    // =========================================
    // TRIP OVERVIEW
    // =========================================

    doc.setTextColor(
      ...dark
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(15);

    doc.text(
      "Trip Overview",
      20,
      currentY
    );

    currentY += 10;

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(10);

    const overview = [
      [
        "Destination",
        trip.destination || "N/A"
      ],
      [
        "Start Date",
        formatDate(trip.startDate)
      ],
      [
        "End Date",
        formatDate(trip.endDate)
      ],
      [
        "Travelers",
        `${members.length || 0} member(s)`
      ],
      [
        "Budget",
        currency(
          trip.budget
        )
      ],
      [
        "Status",
        status
      ]
    ];

    overview.forEach(
      ([label, value]) => {
        addNewPageIfNeeded(9);

        doc.setTextColor(
          ...gray
        );

        doc.text(
          `${label}:`,
          25,
          currentY
        );

        doc.setTextColor(
          ...dark
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.text(
          String(value),
          75,
          currentY
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        currentY += 8;
      }
    );

    // =========================================
    // DESCRIPTION
    // =========================================

    if (trip.description) {

      currentY += 7;

      addNewPageIfNeeded(30);

      doc.setTextColor(
        ...dark
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(15);

      doc.text(
        "About This Trip",
        20,
        currentY
      );

      currentY += 8;

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(10);

      doc.setTextColor(
        ...gray
      );

      const descriptionLines =
        doc.splitTextToSize(
          trip.description,
          pageWidth - 40
        );

      doc.text(
        descriptionLines,
        20,
        currentY
      );

      currentY +=
        descriptionLines.length * 5 + 8;
    }

    // =========================================
    // TRAVEL WISH
    // =========================================

    addNewPageIfNeeded(35);

    doc.setFillColor(
      239,
      246,
      255
    );

    doc.roundedRect(
      20,
      currentY,
      pageWidth - 40,
      27,
      5,
      5,
      "F"
    );

    doc.setTextColor(
      ...primary
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(10);

    doc.text(
      "✈ Wishing you a wonderful journey!",
      pageWidth / 2,
      currentY + 11,
      {
        align: "center"
      }
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(8);

    doc.setTextColor(
      ...gray
    );

    doc.text(
      "Travel safely, explore freely and make unforgettable memories.",
      pageWidth / 2,
      currentY + 19,
      {
        align: "center"
      }
    );

    currentY += 40;

    // =========================================
    // ITINERARY
    // =========================================

    addNewPageIfNeeded(30);

    doc.setTextColor(
      ...dark
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(15);

    doc.text(
      "Itinerary",
      20,
      currentY
    );

    currentY += 9;

    if (
      itineraries.length === 0
    ) {

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(10);

      doc.setTextColor(
        ...gray
      );

      doc.text(
        "No itinerary activities added yet.",
        25,
        currentY
      );

      currentY += 15;

    } else {

      itineraries.forEach(
        (item, index) => {

          addNewPageIfNeeded(35);

          doc.setFillColor(
            248,
            249,
            255
          );

          doc.roundedRect(
            20,
            currentY,
            pageWidth - 40,
            30,
            4,
            4,
            "F"
          );

          doc.setTextColor(
            ...primary
          );

          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.setFontSize(10);

          doc.text(
            `DAY ${item.dayNumber || index + 1}`,
            27,
            currentY + 9
          );

          doc.setTextColor(
            ...dark
          );

          doc.setFontSize(11);

          doc.text(
            item.activity || "Activity",
            65,
            currentY + 9
          );

          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(8);

          doc.setTextColor(
            ...gray
          );

          let info =
            item.location || "";

          if (item.activityTime) {
            info += ` • ${item.activityTime}`;
          }

          doc.text(
            info || "Location not specified",
            65,
            currentY + 17
          );

          if (item.notes) {

            const notes =
              doc.splitTextToSize(
                item.notes,
                pageWidth - 90
              );

            doc.text(
              notes[0],
              65,
              currentY + 24
            );
          }

          currentY += 36;
        }
      );
    }

    // =========================================
    // EXPENSE SUMMARY
    // =========================================

    addNewPageIfNeeded(50);

    doc.setTextColor(
      ...dark
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(15);

    doc.text(
      "Expense Summary",
      20,
      currentY
    );

    currentY += 10;

    const expenseSummary = [
      [
        "Budget",
        currency(
          summary.budget || trip.budget
        )
      ],
      [
        "Total Expenses",
        currency(
          summary.totalExpense
        )
      ],
      [
        "Remaining Budget",
        currency(
          summary.remainingBudget
        )
      ],
      [
        "Budget Used",
        `${Number(
          summary.percentageUsed || 0
        ).toFixed(2)}%`
      ]
    ];

    expenseSummary.forEach(
      ([label, value]) => {

        addNewPageIfNeeded(9);

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(10);

        doc.setTextColor(
          ...gray
        );

        doc.text(
          label,
          25,
          currentY
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setTextColor(
          ...dark
        );

        doc.text(
          value,
          pageWidth - 25,
          currentY,
          {
            align: "right"
          }
        );

        currentY += 8;
      }
    );

    // =========================================
    // EXPENSE LIST
    // =========================================

    if (expenses.length > 0) {

      currentY += 8;

      addNewPageIfNeeded(25);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(12);

      doc.setTextColor(
        ...dark
      );

      doc.text(
        "Recent Expenses",
        20,
        currentY
      );

      currentY += 8;

      expenses
        .slice(0, 8)
        .forEach((expense) => {

          addNewPageIfNeeded(10);

          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(9);

          doc.setTextColor(
            ...dark
          );

          doc.text(
            expense.expenseName ||
              "Expense",
            25,
            currentY
          );

          doc.setTextColor(
            ...gray
          );

          doc.text(
            expense.category || "",
            95,
            currentY
          );

          doc.setTextColor(
            ...dark
          );

          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.text(
            currency(
              expense.amount
            ),
            pageWidth - 25,
            currentY,
            {
              align: "right"
            }
          );

          currentY += 7;
        });
    }

    // =========================================
    // MEMBERS
    // =========================================

    if (members.length > 0) {

      currentY += 8;

      addNewPageIfNeeded(30);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(15);

      doc.setTextColor(
        ...dark
      );

      doc.text(
        "Travelers",
        20,
        currentY
      );

      currentY += 9;

      members.forEach(
        (member) => {

          addNewPageIfNeeded(9);

          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(9);

          doc.setTextColor(
            ...dark
          );

          doc.text(
            member.memberName ||
              "Traveler",
            25,
            currentY
          );

          doc.setTextColor(
            ...gray
          );

          doc.text(
            member.memberEmail ||
              "",
            80,
            currentY
          );

          doc.setTextColor(
            ...primary
          );

          doc.text(
            member.role || "Member",
            pageWidth - 25,
            currentY,
            {
              align: "right"
            }
          );

          currentY += 7;
        }
      );
    }

    // =========================================
    // FINAL MESSAGE
    // =========================================

    currentY += 12;

    addNewPageIfNeeded(45);

    doc.setFillColor(
      ...primary
    );

    doc.roundedRect(
      20,
      currentY,
      pageWidth - 40,
      38,
      6,
      6,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(13);

    doc.text(
      "Have a safe and amazing trip! ✈",
      pageWidth / 2,
      currentY + 15,
      {
        align: "center"
      }
    );

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(9);

    doc.text(
      "Thank you for planning your journey with TripNest.",
      pageWidth / 2,
      currentY + 25,
      {
        align: "center"
      }
    );

    currentY += 48;

    // =========================================
    // FOOTER
    // =========================================

    addFooter();

    // =========================================
    // SAVE
    // =========================================

    const safeName =
      (trip.tripName ||
        "TripNest-Trip-Details")
        .replace(
          /[^a-zA-Z0-9-_ ]/g,
          ""
        )
        .trim()
        .replace(/\s+/g, "-");

    doc.save(
      `${safeName}-TripNest-Details.pdf`
    );
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="tripDetailsLoading">

        <div className="loadingSpinner"></div>

        <h3>
          Loading trip details...
        </h3>

        <p>
          Please wait.
        </p>

      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error || !trip) {
    return (
      <div className="tripDetailsError">

        <div className="errorIcon">
          🌍
        </div>

        <h2>
          Trip Not Found
        </h2>

        <p>
          We couldn't load this trip.
        </p>

        <button
          onClick={() =>
            navigate("/my-trips")
          }
        >
          <FaArrowLeft />
          Back to My Trips
        </button>

      </div>
    );
  }

  const status = getTripStatus();

  const percentage = Math.min(
    Number(
      summary.percentageUsed || 0
    ),
    100
  );

  // =========================================
  // MAIN
  // =========================================

  return (
    <div className="tripDetailsPage">

      {/* =====================================
          TOP BAR
      ===================================== */}

      <div className="tripDetailsTopBar">

        <Link
          to="/my-trips"
          className="backToTrips"
        >
          <FaArrowLeft />
          Back to My Trips
        </Link>

        <button
          className="downloadPdfBtn"
          onClick={downloadPDF}
        >
          <FaDownload />
          Download Trip PDF
        </button>

      </div>

      {/* =====================================
          HERO
      ===================================== */}

      <section className="tripHero">

        <div className="tripHeroContent">

          <div className="tripHeroIcon">
            <FaPlaneDeparture />
          </div>

          <div className="tripHeroText">

            <div className="tripTitleRow">

              <h1>
                {trip.tripName}
              </h1>

              <span
                className={`tripStatus status-${status.toLowerCase()}`}
              >
                {status}
              </span>

            </div>

            <div className="tripDestination">

              <FaMapMarkerAlt />

              {trip.destination}

            </div>

            {trip.description && (
              <p className="tripDescription">
                {trip.description}
              </p>
            )}

          </div>

          <button
            className="editTripMainBtn"
            onClick={() =>
              navigate(
                `/edit-trip/${trip.id}`
              )
            }
          >
            <FaEdit />
            Edit Trip
          </button>

        </div>

      </section>

      {/* =====================================
          OVERVIEW
      ===================================== */}

      <section className="tripOverview">

        <div className="overviewCard">

          <div className="overviewIcon">
            <FaMapMarkerAlt />
          </div>

          <div>

            <span>
              Destination
            </span>

            <strong>
              {trip.destination}
            </strong>

          </div>

        </div>

        <div className="overviewCard">

          <div className="overviewIcon">
            <FaCalendarAlt />
          </div>

          <div>

            <span>
              Travel Dates
            </span>

            <strong>
              {formatDate(
                trip.startDate
              )}
            </strong>

            <small>
              to{" "}
              {formatDate(
                trip.endDate
              )}
            </small>

          </div>

        </div>

        <div className="overviewCard">

          <div className="overviewIcon">
            <FaUsers />
          </div>

          <div>

            <span>
              Travelers
            </span>

            <strong>
              {members.length}
            </strong>

            <small>
              people
            </small>

          </div>

        </div>

        <div className="overviewCard">

          <div className="overviewIcon">
            <FaWallet />
          </div>

          <div>

            <span>
              Budget
            </span>

            <strong>
              {currency(
                trip.budget
              )}
            </strong>

          </div>

        </div>

      </section>

      {/* =====================================
          TIMELINE
      ===================================== */}

      <section className="tripSection">

        <div className="sectionHeader">

          <div>

            <h2>
              <FaRoute />
              Trip Timeline
            </h2>

            <p>
              Your journey at a glance
            </p>

          </div>

        </div>

        <div className="timeline">

          <div className="timelineItem">

            <div className="timelineDot">
              <FaPlaneDeparture />
            </div>

            <div className="timelineContent">

              <span>
                START
              </span>

              <h3>
                {formatDate(
                  trip.startDate
                )}
              </h3>

              <p>
                Trip begins
              </p>

            </div>

          </div>

          <div className="timelineLine"></div>

          <div className="timelineItem">

            <div className="timelineDot">
              <FaMapMarkerAlt />
            </div>

            <div className="timelineContent">

              <span>
                DESTINATION
              </span>

              <h3>
                {trip.destination}
              </h3>

              <p>
                Explore & enjoy
              </p>

            </div>

          </div>

          <div className="timelineLine"></div>

          <div className="timelineItem">

            <div className="timelineDot">
              <FaCheckCircle />
            </div>

            <div className="timelineContent">

              <span>
                END
              </span>

              <h3>
                {formatDate(
                  trip.endDate
                )}
              </h3>

              <p>
                Trip ends
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          MAIN GRID
      ===================================== */}

      <div className="tripMainGrid">

        {/* ===================================
            ITINERARY
        =================================== */}

        <section className="tripSection">

          <div className="sectionHeader">

            <div>

              <h2>
                <FaRoute />
                Itinerary
              </h2>

              <p>
                Your planned activities
              </p>

            </div>

            <Link
              to={`/trip/${id}/itinerary`}
              className="viewAllLink"
            >
              View All
              <FaChevronRight />
            </Link>

          </div>

          {itineraries.length === 0 ? (

            <div className="emptyPreview">

              <div className="emptyPreviewIcon">
                🗺️
              </div>

              <h3>
                No itinerary yet
              </h3>

              <p>
                Add activities to build
                your travel plan.
              </p>

              <Link
                to={`/trip/${id}/add-itinerary`}
                className="primaryActionBtn"
              >
                <FaPlus />
                Add Activity
              </Link>

            </div>

          ) : (

            <div className="itineraryPreviewList">

              {itineraries
                .slice(0, 5)
                .map((item) => (

                  <div
                    className="itineraryPreviewItem"
                    key={item.id}
                  >

                    <span className="dayBadge">
                      Day{" "}
                      {item.dayNumber}
                    </span>

                    <div className="itineraryItemInfo">

                      <h3>
                        {item.activity}
                      </h3>

                      <p>

                        {item.location && (
                          <span>
                            <FaMapMarkerAlt />
                            {item.location}
                          </span>
                        )}

                        {item.activityTime && (
                          <span>
                            <FaClock />
                            {item.activityTime}
                          </span>
                        )}

                      </p>

                      {item.notes && (
                        <small>
                          {item.notes}
                        </small>
                      )}

                    </div>

                  </div>

                ))}

              {itineraries.length > 5 && (

                <Link
                  to={`/trip/${id}/itinerary`}
                  className="secondaryActionBtn"
                >
                  View{" "}
                  {itineraries.length - 5} more
                  activities
                </Link>

              )}

            </div>

          )}

        </section>

        {/* ===================================
            EXPENSES
        =================================== */}

        <section className="tripSection">

          <div className="sectionHeader">

            <div>

              <h2>
                <FaMoneyBillWave />
                Expenses
              </h2>

              <p>
                Track your travel spending
              </p>

            </div>

            <Link
              to={`/trip/${id}/expenses`}
              className="viewAllLink"
            >
              View All
              <FaChevronRight />
            </Link>

          </div>

          <div className="expenseMiniStats">

            <div>

              <span>
                Budget
              </span>

              <strong>
                {currency(
                  summary.budget ||
                    trip.budget
                )}
              </strong>

            </div>

            <div>

              <span>
                Spent
              </span>

              <strong>
                {currency(
                  summary.totalExpense
                )}
              </strong>

            </div>

            <div>

              <span>
                Remaining
              </span>

              <strong
                className={
                  Number(
                    summary.remainingBudget
                  ) < 0
                    ? "negativeAmount"
                    : "positiveAmount"
                }
              >
                {currency(
                  summary.remainingBudget
                )}
              </strong>

            </div>

          </div>

          <div className="budgetProgressSection">

            <div className="progressHeader">

              <span>
                Budget Used
              </span>

              <strong>
                {Number(
                  summary.percentageUsed || 0
                ).toFixed(1)}
                %
              </strong>

            </div>

            <div className="progressBar">

              <div
                className={`progressFill ${
                  Number(
                    summary.percentageUsed
                  ) > 100
                    ? "overBudget"
                    : ""
                }`}
                style={{
                  width: `${percentage}%`
                }}
              ></div>

            </div>

          </div>

          {expenses.length === 0 ? (

            <div className="emptyExpenseSmall">

              <span>
                💰
              </span>

              <p>
                No expenses added yet.
              </p>

              <Link
                to={`/trip/${id}/add-expense`}
                className="secondaryActionBtn"
              >
                <FaPlus />
                Add Expense
              </Link>

            </div>

          ) : (

            <div className="recentExpenses">

              {expenses
                .slice(0, 4)
                .map((expense) => (

                  <div
                    className="recentExpenseItem"
                    key={expense.id}
                  >

                    <div>

                      <h4>
                        {expense.expenseName}
                      </h4>

                      <span>
                        {expense.category}
                        {" • "}
                        {expense.expenseDate}
                      </span>

                    </div>

                    <strong>
                      {currency(
                        expense.amount
                      )}
                    </strong>

                  </div>

                ))}

            </div>

          )}

        </section>

      </div>

      {/* =====================================
          QUICK ACTIONS
      ===================================== */}

      <section className="tripSection quickActionsSection">

        <div className="sectionHeader">

          <div>

            <h2>
              <FaCompass />
              Quick Actions
            </h2>

            <p>
              Manage your trip easily
            </p>

          </div>

        </div>

        <div className="quickActionsGrid">

          <Link
            to={`/trip/${id}/itinerary`}
            className="quickActionCard"
          >

            <div className="quickActionIcon">
              🗺️
            </div>

            <div>

              <h3>
                Itinerary
              </h3>

              <p>
                Manage activities
              </p>

            </div>

            <FaChevronRight />

          </Link>

          <Link
            to={`/trip/${id}/expenses`}
            className="quickActionCard"
          >

            <div className="quickActionIcon">
              💰
            </div>

            <div>

              <h3>
                Expenses
              </h3>

              <p>
                Track spending
              </p>

            </div>

            <FaChevronRight />

          </Link>

          <Link
            to={`/trip/${id}/members`}
            className="quickActionCard"
          >

            <div className="quickActionIcon">
              👥
            </div>

            <div>

              <h3>
                Travelers
              </h3>

              <p>
                Manage trip members
              </p>

            </div>

            <FaChevronRight />

          </Link>

          <Link
            to={`/trip/${id}/documents`}
            className="quickActionCard"
          >

            <div className="quickActionIcon">
              📄
            </div>

            <div>

              <h3>
                Documents
              </h3>

              <p>
                Travel documents
              </p>

            </div>

            <FaChevronRight />

          </Link>

          <Link
            to={`/edit-trip/${id}`}
            className="quickActionCard"
          >

            <div className="quickActionIcon">
              ✏️
            </div>

            <div>

              <h3>
                Edit Trip
              </h3>

              <p>
                Update trip details
              </p>

            </div>

            <FaChevronRight />

          </Link>

          <button
            className="quickActionCard pdfAction"
            onClick={downloadPDF}
          >

            <div className="quickActionIcon">
              📥
            </div>

            <div>

              <h3>
                Download PDF
              </h3>

              <p>
                Save trip details
              </p>

            </div>

            <FaDownload />

          </button>

        </div>

      </section>

    </div>
  );
}

export default TripDetails;