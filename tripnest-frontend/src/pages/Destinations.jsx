import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaCity,
  FaMoneyBillWave,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaArrowRight,
  FaCompass,
  FaMountain,
  FaUmbrellaBeach,
  FaLandmark,
  FaTree,
  FaTimes
} from "react-icons/fa";

import "../styles/Destinations.css";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  const API_URL =
    "https://tripnest-fird.onrender.com/api";

  /* =====================================
     FETCH DESTINATIONS
  ===================================== */

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/destinations`,
        {
          timeout: 30000
        }
      );

      console.log(
        "Destinations API response:",
        response.data
      );

      if (Array.isArray(response.data)) {
        setDestinations(response.data);
      } else if (
        Array.isArray(response.data?.content)
      ) {
        setDestinations(
          response.data.content
        );
      } else {
        setDestinations([]);
      }
    } catch (error) {
      console.error(
        "Fetch destinations error:",
        error
      );

      setDestinations([]);

      setError(
        "Unable to load destinations. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================
     EDIT DESTINATION
  ===================================== */

  const editDestination = (id) => {
    navigate(
      `/edit-destination/${id}`
    );
  };

  /* =====================================
     VIEW DETAILS
  ===================================== */

  const viewDestination = (id) => {
    navigate(
      `/destination/${id}`
    );
  };

  /* =====================================
     DELETE DESTINATION
  ===================================== */

  const deleteDestination = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this destination?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      await axios.delete(
        `${API_URL}/destinations/${id}`
      );

      setDestinations((previous) =>
        previous.filter(
          (destination) =>
            destination.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete destination error:",
        error
      );

      alert(
        "Failed to delete destination."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================
     DESTINATION CATEGORY
  ===================================== */

  const getCategory = (destination) => {
    const text = `
      ${destination.destinationName || ""}
      ${destination.description || ""}
      ${destination.state || ""}
      ${destination.country || ""}
      ${destination.city || ""}
    `.toLowerCase();

    if (
      text.includes("beach") ||
      text.includes("goa") ||
      text.includes("coast") ||
      text.includes("sea")
    ) {
      return "Beach";
    }

    if (
      text.includes("mountain") ||
      text.includes("hill") ||
      text.includes("himalaya") ||
      text.includes("ladakh") ||
      text.includes("manali") ||
      text.includes("shimla")
    ) {
      return "Mountains";
    }

    if (
      text.includes("heritage") ||
      text.includes("fort") ||
      text.includes("palace") ||
      text.includes("temple") ||
      text.includes("histor")
    ) {
      return "Heritage";
    }

    if (
      text.includes("forest") ||
      text.includes("wildlife") ||
      text.includes("national park") ||
      text.includes("nature")
    ) {
      return "Nature";
    }

    return "City";
  };

  /* =====================================
     CATEGORY ICON
  ===================================== */

  const getCategoryIcon = (
    destinationCategory
  ) => {
    if (
      destinationCategory ===
      "Beach"
    ) {
      return <FaUmbrellaBeach />;
    }

    if (
      destinationCategory ===
      "Mountains"
    ) {
      return <FaMountain />;
    }

    if (
      destinationCategory ===
      "Heritage"
    ) {
      return <FaLandmark />;
    }

    if (
      destinationCategory ===
      "Nature"
    ) {
      return <FaTree />;
    }

    return <FaCity />;
  };

  /* =====================================
     CATEGORY LIST
  ===================================== */

  const categories = [
    {
      name: "All",
      icon: <FaCompass />
    },
    {
      name: "City",
      icon: <FaCity />
    },
    {
      name: "Beach",
      icon: <FaUmbrellaBeach />
    },
    {
      name: "Mountains",
      icon: <FaMountain />
    },
    {
      name: "Heritage",
      icon: <FaLandmark />
    },
    {
      name: "Nature",
      icon: <FaTree />
    }
  ];

  /* =====================================
     FILTER DESTINATIONS
  ===================================== */

  const filteredDestinations =
    useMemo(() => {
      const searchText =
        search.trim().toLowerCase();

      return destinations.filter(
        (destination) => {
          const name =
            String(
              destination.destinationName ||
                ""
            ).toLowerCase();

          const country =
            String(
              destination.country ||
                ""
            ).toLowerCase();

          const state =
            String(
              destination.state ||
                ""
            ).toLowerCase();

          const city =
            String(
              destination.city ||
                ""
            ).toLowerCase();

          const description =
            String(
              destination.description ||
                ""
            ).toLowerCase();

          const matchesSearch =
            !searchText ||
            name.includes(searchText) ||
            country.includes(searchText) ||
            state.includes(searchText) ||
            city.includes(searchText) ||
            description.includes(
              searchText
            );

          const destinationCategory =
            getCategory(destination);

          const matchesCategory =
            category === "All" ||
            destinationCategory ===
              category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      destinations,
      search,
      category
    ]);

  /* =====================================
     CLEAR SEARCH
  ===================================== */

  const clearSearch = () => {
    setSearch("");
    setCategory("All");
  };

  /* =====================================
     LOADING
  ===================================== */

  if (loading) {
    return (
      <div className="destinations-container">

        <div className="destination-header">

          <div className="exploreBadge">
            <FaCompass />
            EXPLORE
          </div>

          <h1>
            Discover Your Next Adventure
          </h1>

          <p>
            Explore amazing destinations,
            discover new experiences and
            plan unforgettable journeys.
          </p>

        </div>

        <div className="destination-loading">

          <div className="loading-spinner"></div>

          <h3>
            Exploring destinations...
          </h3>

          <p>
            Please wait while we prepare
            your travel options.
          </p>

        </div>

      </div>
    );
  }

  /* =====================================
     MAIN PAGE
  ===================================== */

  return (
    <div className="destinations-container">

      {/* =================================
          HERO
      ================================= */}

      <section className="destinationHero">

        <div className="heroContent">

          <div className="exploreBadge">
            <FaCompass />
            EXPLORE TRIPNEST
          </div>

          <h1>
            Discover Your Next Adventure
          </h1>

          <p>
            Find beautiful places, explore
            exciting experiences and start
            planning your perfect trip.
          </p>

        </div>

        <div className="heroDecoration">

          <div className="heroCircle circleOne"></div>

          <div className="heroCircle circleTwo"></div>

          <div className="heroCompass">
            <FaGlobeAmericas />
          </div>

        </div>

      </section>

      {/* =================================
          SEARCH
      ================================= */}

      <div className="destinationSearchWrapper">

        <FaSearch className="destinationSearchIcon" />

        <input
          type="text"
          placeholder="Search destination, city, state or country..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {search && (
          <button
            className="clearSearchBtn"
            onClick={() =>
              setSearch("")
            }
            title="Clear search"
          >
            <FaTimes />
          </button>
        )}

      </div>

      {/* =================================
          CATEGORIES
      ================================= */}

      <div className="categorySection">

        <div className="categoryHeader">

          <h2>
            Explore by Category
          </h2>

          <span>
            {filteredDestinations.length}{" "}
            destinations
          </span>

        </div>

        <div className="categoryList">

          {categories.map(
            (item) => (
              <button
                key={item.name}
                className={
                  category ===
                  item.name
                    ? "categoryBtn active"
                    : "categoryBtn"
                }
                onClick={() =>
                  setCategory(
                    item.name
                  )
                }
              >
                {item.icon}
                {item.name}
              </button>
            )
          )}

        </div>

      </div>

      {/* =================================
          ERROR
      ================================= */}

      {error && (
        <div className="destinationError">

          <span>
            ⚠️
          </span>

          <div>

            <strong>
              Something went wrong
            </strong>

            <p>
              {error}
            </p>

          </div>

          <button
            onClick={fetchDestinations}
          >
            Try Again
          </button>

        </div>
      )}

      {/* =================================
          RESULTS HEADER
      ================================= */}

      <div className="destinationSummary">

        <div>

          <h2>
            {search ||
            category !== "All"
              ? "Search Results"
              : "Popular Destinations"}
          </h2>

          <p>
            {filteredDestinations.length}{" "}
            destination
            {filteredDestinations.length !==
            1
              ? "s"
              : ""}{" "}
            available
          </p>

        </div>

        <button
          className="add-destination-btn"
          onClick={() =>
            navigate(
              "/add-destination"
            )
          }
        >
          <FaPlus />
          Add Destination
        </button>

      </div>

      {/* =================================
          DESTINATION GRID
      ================================= */}

      {filteredDestinations.length ===
      0 ? (

        <div className="destination-empty">

          <div className="emptyDestinationIcon">

            <FaGlobeAmericas />

          </div>

          <h2>
            {search ||
            category !== "All"
              ? "No Destinations Found"
              : "No Destinations Available"}
          </h2>

          <p>
            {search ||
            category !== "All"
              ? "Try another search or category."
              : "Add your first destination to TripNest."}
          </p>

          {(search ||
            category !== "All") && (
            <button
              className="clearFilterBtn"
              onClick={clearSearch}
            >
              Clear Filters
            </button>
          )}

          {!search &&
            category === "All" && (
              <button
                className="add-destination-btn"
                onClick={() =>
                  navigate(
                    "/add-destination"
                  )
                }
              >
                <FaPlus />
                Add Destination
              </button>
            )}

        </div>

      ) : (

        <div className="destination-grid">

          {filteredDestinations.map(
            (destination) => {

              const destinationCategory =
                getCategory(
                  destination
                );

              return (
                <article
                  className="destination-card"
                  key={destination.id}
                >

                  {/* CARD VISUAL */}

                  <div className="destinationCardVisual">

                    <div className="destinationVisualPattern">

                      {getCategoryIcon(
                        destinationCategory
                      )}

                    </div>

                    <span className="destinationCategory">

                      {getCategoryIcon(
                        destinationCategory
                      )}

                      {destinationCategory}

                    </span>

                    {/* ADMIN ACTIONS */}

                    <div className="destination-actions">

                      <button
                        className="destination-edit"
                        onClick={() =>
                          editDestination(
                            destination.id
                          )
                        }
                        title="Edit destination"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="destination-delete"
                        disabled={
                          deletingId ===
                          destination.id
                        }
                        onClick={() =>
                          deleteDestination(
                            destination.id
                          )
                        }
                        title="Delete destination"
                      >
                        {deletingId ===
                        destination.id ? (
                          <span className="miniSpinner"></span>
                        ) : (
                          <FaTrash />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* CARD BODY */}

                  <div className="destinationCardBody">

                    <h2 className="destination-name">

                      {destination.destinationName ||
                        "Unnamed Destination"}

                    </h2>

                    {/* LOCATION */}

                    <div className="destination-location">

                      <span>

                        <FaMapMarkerAlt />

                        {destination.city ||
                          "City"}

                        {destination.state
                          ? `, ${destination.state}`
                          : ""}

                      </span>

                      <span>

                        <FaGlobeAmericas />

                        {destination.country ||
                          "Country"}

                      </span>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="destination-description">

                      {destination.description ||
                        "Explore this beautiful destination and create unforgettable memories."}

                    </p>

                    {/* BUDGET */}

                    <div className="destination-budget">

                      <div>

                        <FaMoneyBillWave />

                        <span>
                          Estimated Budget
                        </span>

                      </div>

                      <strong>

                        ₹
                        {Number(
                          destination.estimatedBudget ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                    </div>

                    {/* DETAILS BUTTON */}

                    <button
                      className="viewDestinationBtn"
                      onClick={() =>
                        viewDestination(
                          destination.id
                        )
                      }
                    >

                      Explore Destination

                      <FaArrowRight />

                    </button>

                  </div>

                </article>
              );
            }
          )}

        </div>

      )}

      {/* =================================
          BOTTOM CTA
      ================================= */}

      {destinations.length > 0 && (
        <section className="destinationBottomCta">

          <div>

            <div className="ctaIcon">
              <FaCompass />
            </div>

            <div>

              <h2>
                Ready to plan your adventure?
              </h2>

              <p>
                Choose a destination and
                start creating your perfect
                travel experience.
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              navigate(
                "/add-destination"
              )
            }
          >
            <FaPlus />
            Add Destination
          </button>

        </section>
      )}

    </div>
  );
}

export default Destinations;