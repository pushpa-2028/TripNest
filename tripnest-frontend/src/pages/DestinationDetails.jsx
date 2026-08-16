import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaGlobeAsia,
  FaMoneyBillWave,
  FaMountain,
  FaCalendarAlt,
  FaUmbrellaBeach,
  FaMap,
  FaRoute,
  FaPlane,
  FaTimes,
  FaCloudSun,
  FaTemperatureHigh,
  FaTint,
  FaWind
} from "react-icons/fa";

import "../styles/DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);

  // ================================
  // WEATHER STATE
  // ================================

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  // ================================
  // FETCH DESTINATION
  // ================================

  useEffect(() => {
    fetchDestination();
  }, [id]);

  const fetchDestination = async () => {
    try {
      setLoading(true);
      setError("");

      // DO NOT CHANGE THIS API
      const response = await axios.get(
        `https://tripnest-fird.onrender.com/api/destinations/${id}`,
        {
          timeout: 60000
        }
      );

      console.log("Destination details:", response.data);

      setDestination(response.data);

    } catch (error) {
      console.error("Destination details error:", error);

      setError(
        "Unable to load destination details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // FETCH LIVE WEATHER
  // ================================

  useEffect(() => {
    if (destination) {
      fetchWeather();
    }
  }, [destination]);

  const fetchWeather = async () => {
  try {
    setWeatherLoading(true);
    setWeatherError("");

    const originalCity =
      destination.city ||
      destination.destinationName ||
      "";

    const country =
      destination.country || "";

    if (!originalCity) {
      setWeatherError("Location unavailable");
      return;
    }

    // =====================================
    // LOCATION NAME FALLBACKS
    // =====================================

    const locationNames = [
      originalCity,
      destination.destinationName,
      `${originalCity}, ${destination.state || ""}`,
      `${originalCity}, ${country}`
    ].filter(Boolean);

    let location = null;

    // =====================================
    // TRY GEOCODING
    // =====================================

    for (const locationName of locationNames) {
      try {
        console.log(
          "Trying weather location:",
          locationName
        );

        const locationResponse = await axios.get(
          "https://geocoding-api.open-meteo.com/v1/search",
          {
            params: {
              name: locationName,
              count: 5,
              language: "en",
              format: "json"
            }
          }
        );

        const results =
          locationResponse.data?.results;

        if (
          results &&
          results.length > 0
        ) {
          // Prefer India if available
          location =
            results.find(
              (item) =>
                item.country_code === "IN"
            ) || results[0];

          break;
        }

      } catch (error) {
        console.log(
          "Geocoding attempt failed:",
          locationName
        );
      }
    }

    // =====================================
    // SPECIAL FALLBACK
    // Sakaleshpura -> Sakleshpur
    // =====================================

    if (!location) {

      const normalizedName =
        originalCity
          .toLowerCase()
          .replace(/\s+/g, "");

      if (
        normalizedName.includes(
          "sakaleshpura"
        )
      ) {

        console.log(
          "Trying corrected location: Sakleshpur"
        );

        const fallbackResponse =
          await axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            {
              params: {
                name: "Sakleshpur",
                count: 5,
                language: "en",
                format: "json"
              }
            }
          );

        const results =
          fallbackResponse.data?.results;

        if (
          results &&
          results.length > 0
        ) {
          location =
            results.find(
              (item) =>
                item.country_code === "IN"
            ) || results[0];
        }
      }
    }

    // =====================================
    // NO LOCATION FOUND
    // =====================================

    if (!location) {

      console.error(
        "Could not find weather location for:",
        originalCity
      );

      setWeatherError(
        "Weather location not found."
      );

      return;
    }

    console.log(
      "Weather location found:",
      location
    );

    // =====================================
    // GET CURRENT WEATHER
    // =====================================

    const weatherResponse =
      await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,

            current:
              "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",

            timezone: "auto"
          }
        }
      );

    const current =
      weatherResponse.data?.current;

    if (!current) {

      setWeatherError(
        "Weather information unavailable."
      );

      return;
    }

    // =====================================
    // SAVE WEATHER
    // =====================================

    setWeather({

      temperature:
        current.temperature_2m,

      feelsLike:
        current.apparent_temperature,

      humidity:
        current.relative_humidity_2m,

      windSpeed:
        current.wind_speed_10m,

      weatherCode:
        current.weather_code,

      timezone:
        weatherResponse.data?.timezone,

      city:
        location.name,

      country:
        location.country

    });

  } catch (error) {

    console.error(
      "Weather API error:",
      error
    );

    setWeatherError(
      "Unable to load live weather."
    );

  } finally {

    setWeatherLoading(false);

  }
};

  // ================================
  // WEATHER DESCRIPTION
  // ================================

  const getWeatherInfo = (code) => {

    if (code === 0) {
      return {
        icon: "☀️",
        title: "Clear Sky",
        description: "Clear and sunny weather"
      };
    }

    if (code === 1 || code === 2) {
      return {
        icon: "🌤️",
        title: "Partly Cloudy",
        description: "Mostly pleasant weather"
      };
    }

    if (code === 3) {
      return {
        icon: "☁️",
        title: "Cloudy",
        description: "Overcast conditions"
      };
    }

    if (
      code === 45 ||
      code === 48
    ) {
      return {
        icon: "🌫️",
        title: "Foggy",
        description: "Reduced visibility"
      };
    }

    if (
      code >= 51 &&
      code <= 57
    ) {
      return {
        icon: "🌦️",
        title: "Drizzle",
        description: "Light drizzle"
      };
    }

    if (
      code >= 61 &&
      code <= 67
    ) {
      return {
        icon: "🌧️",
        title: "Rain",
        description: "Rainy conditions"
      };
    }

    if (
      code >= 71 &&
      code <= 77
    ) {
      return {
        icon: "❄️",
        title: "Snow",
        description: "Snowy conditions"
      };
    }

    if (
      code >= 80 &&
      code <= 82
    ) {
      return {
        icon: "🌦️",
        title: "Rain Showers",
        description: "Passing rain showers"
      };
    }

    if (
      code >= 95 &&
      code <= 99
    ) {
      return {
        icon: "⛈️",
        title: "Thunderstorm",
        description: "Thunderstorms possible"
      };
    }

    return {
      icon: "🌤️",
      title: "Pleasant Weather",
      description: "Check current conditions"
    };
  };

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="destinationDetailsLoading">

        <div className="destinationSpinner"></div>

        <h2>
          Discovering destination...
        </h2>

        <p>
          Please wait while we load the details.
        </p>

      </div>
    );
  }

  // ================================
  // ERROR
  // ================================

  if (error || !destination) {
    return (
      <div className="destinationDetailsError">

        <div className="errorEmoji">
          🌍
        </div>

        <h2>
          Destination Not Found
        </h2>

        <p>
          {error || "We couldn't find this destination."}
        </p>

        <button
          onClick={() =>
            navigate("/destinations")
          }
        >
          <FaArrowLeft />
          Back to Destinations
        </button>

      </div>
    );
  }

  const budget = Number(
    destination.estimatedBudget || 0
  );

  const mapQuery = encodeURIComponent(
    `${destination.destinationName || ""}, ${
      destination.city || ""
    }, ${
      destination.state || ""
    }, ${
      destination.country || ""
    }`
  );

  const weatherInfo = weather
    ? getWeatherInfo(weather.weatherCode)
    : null;
      // ================================
  // DESTINATION-SPECIFIC CONTENT
  // ================================

  const getDestinationContent = () => {

    const name = (
      destination.destinationName ||
      ""
    ).toLowerCase();

    // =====================================
    // SAKLESHPUR
    // =====================================

    if (
      name.includes("sakleshpur") ||
      name.includes("sakaleshpura")
    ) {

      return {

        attractions: [

          {
            icon: "🏰",
            title: "Manjarabad Fort",
            description:
              "Explore the historic star-shaped fort and enjoy beautiful hill views.",
            tip:
              "Visit in the morning or evening for comfortable weather and better views."
          },

          {
            icon: "🌿",
            title: "Bisle Ghat",
            description:
              "Discover lush forests, mountain landscapes and peaceful viewpoints.",
            tip:
              "Carry water, comfortable shoes and avoid exploring isolated areas alone."
          },

          {
            icon: "☕",
            title: "Coffee Plantations",
            description:
              "Experience the famous coffee plantations and the green landscapes of Sakleshpur.",
            tip:
              "Ask local plantation owners about guided plantation visits."
          },

          {
            icon: "💦",
            title: "Waterfalls",
            description:
              "Explore beautiful waterfalls and refreshing natural surroundings.",
            tip:
              "During monsoon, be careful around slippery rocks and strong water currents."
          }

        ],

        activities: [

          {
            icon: "🥾",
            title: "Trekking",
            description:
              "Enjoy trekking through the green hills and natural landscapes around Sakleshpur.",
            tip:
              "Wear proper trekking shoes and carry enough drinking water."
          },

          {
            icon: "☕",
            title: "Coffee Plantation Tour",
            description:
              "Walk through coffee estates and learn about local coffee cultivation.",
            tip:
              "A guided plantation walk gives you a better local experience."
          },

          {
            icon: "💦",
            title: "Waterfall Visit",
            description:
              "Spend time exploring the waterfalls and peaceful natural surroundings.",
            tip:
              "Avoid entering deep water and follow local safety instructions."
          },

          {
            icon: "📸",
            title: "Nature Photography",
            description:
              "Capture coffee estates, forests, hills, waterfalls and scenic landscapes.",
            tip:
              "Early morning and evening provide excellent natural lighting."
          }

        ]

      };

    }

    // =====================================
    // GOA
    // =====================================

    if (name.includes("goa")) {

      return {

        attractions: [

          {
            icon: "🏖️",
            title: "Baga Beach",
            description:
              "Enjoy the popular beach, beautiful coastline and lively atmosphere.",
            tip:
              "Visit during sunset for a beautiful beach experience."
          },

          {
            icon: "🏛️",
            title: "Basilica of Bom Jesus",
            description:
              "Explore one of Goa's famous historical and architectural landmarks.",
            tip:
              "Dress respectfully when visiting religious places."
          },

          {
            icon: "🌴",
            title: "Palolem Beach",
            description:
              "Relax at a scenic beach surrounded by coconut trees and peaceful waters.",
            tip:
              "Early morning is a great time for a quieter beach experience."
          },

          {
            icon: "🏰",
            title: "Fort Aguada",
            description:
              "Visit the historic fort and enjoy panoramic views of the Arabian Sea.",
            tip:
              "Carry water because some areas can be exposed to strong sunlight."
          }

        ],

        activities: [

          {
            icon: "🏄",
            title: "Water Sports",
            description:
              "Try exciting activities such as parasailing and other beach adventures.",
            tip:
              "Choose licensed operators and follow safety instructions."
          },

          {
            icon: "🏖️",
            title: "Beach Relaxation",
            description:
              "Relax on Goa's beaches and enjoy the coastal atmosphere.",
            tip:
              "Sun protection is important, especially during the afternoon."
          },

          {
            icon: "🍴",
            title: "Local Food",
            description:
              "Taste local Goan cuisine and explore popular food spots.",
            tip:
              "Try local specialties from well-reviewed restaurants."
          },

          {
            icon: "📸",
            title: "Sunset Photography",
            description:
              "Capture beautiful sunsets, beaches and coastal landscapes.",
            tip:
              "Reach the beach before sunset to find a good photography spot."
          }

        ]

      };

    }

    // =====================================
    // DEFAULT DESTINATION
    // =====================================

    return {

      attractions: [

        {
          icon: "🏞️",
          title: "Scenic Views",
          description:
            `Enjoy beautiful landscapes and natural scenery around ${destination.destinationName}.`,
          tip:
            "Visit scenic locations during early morning or evening for better views."
        },

        {
          icon: "🏛️",
          title: "Local Heritage",
          description:
            `Explore the culture, traditions and historical places of ${destination.destinationName}.`,
          tip:
            "Take some time to learn about the local history and traditions."
        },

        {
          icon: "🌿",
          title: "Nature",
          description:
            `Discover peaceful natural surroundings around ${destination.destinationName}.`,
          tip:
            "Carry water and wear comfortable shoes when exploring nature."
        },

        {
          icon: "📸",
          title: "Photography",
          description:
            `Capture memorable travel moments at ${destination.destinationName}.`,
          tip:
            "Golden hour is ideal for landscape and travel photography."
        }

      ],

      activities: [

        {
          icon: "🥾",
          title: "Nature Exploration",
          description:
            `Explore the natural beauty and outdoor surroundings of ${destination.destinationName}.`,
          tip:
            "Wear comfortable footwear and carry enough water."
        },

        {
          icon: "🌴",
          title: "Relax & Enjoy",
          description:
            `Take a break and enjoy the peaceful atmosphere of ${destination.destinationName}.`,
          tip:
            "Keep some free time in your itinerary to relax."
        },

        {
          icon: "🗺️",
          title: "Local Sightseeing",
          description:
            `Discover popular places and attractions around ${destination.destinationName}.`,
          tip:
            "Start early to visit multiple attractions comfortably."
        },

        {
          icon: "📸",
          title: "Photography",
          description:
            `Capture beautiful memories during your trip to ${destination.destinationName}.`,
          tip:
            "Try sunrise and sunset locations for the best natural lighting."
        }

      ]

    };

  };

  const destinationContent =
    getDestinationContent();

  return (
    <div className="destinationDetailsPage">

      {/* =====================================
          BACK BUTTON
      ===================================== */}

      <div className="destinationDetailsTop">

        <button
          className="backDestinationBtn"
          onClick={() =>
            navigate("/destinations")
          }
        >
          <FaArrowLeft />
          Back to Destinations
        </button>

      </div>

      {/* =====================================
          HERO
      ===================================== */}

      <section className="destinationHero">

        <div className="destinationHeroOverlay">

          <div className="destinationHeroContent">

            <span className="destinationCategory">
              <FaMountain />
              {destination.category ||
                "Travel Destination"}
            </span>

            <h1>
              {destination.destinationName}
            </h1>

            <p className="heroLocation">
              <FaMapMarkerAlt />

              {destination.city || "N/A"}

              {destination.state
                ? `, ${destination.state}`
                : ""}

              {destination.country
                ? `, ${destination.country}`
                : ""}
            </p>

            <p className="heroDescription">
              {destination.description ||
                "Discover beautiful places, exciting experiences and unforgettable memories."}
            </p>

          </div>

        </div>

      </section>

      {/* =====================================
          QUICK INFO
      ===================================== */}

      <section className="destinationInfoGrid">

        <div className="destinationInfoCard">

          <div className="infoIcon">
            <FaGlobeAsia />
          </div>

          <div>
            <span>
              Country
            </span>

            <strong>
              {destination.country || "N/A"}
            </strong>
          </div>

        </div>

        <div className="destinationInfoCard">

          <div className="infoIcon">
            <FaMapMarkerAlt />
          </div>

          <div>
            <span>
              Location
            </span>

            <strong>
              {destination.city ||
                destination.state ||
                "N/A"}
            </strong>
          </div>

        </div>

        <div className="destinationInfoCard">

          <div className="infoIcon">
            <FaMoneyBillWave />
          </div>

          <div>
            <span>
              Estimated Budget
            </span>

            <strong>
              ₹{budget.toLocaleString("en-IN")}
            </strong>
          </div>

        </div>

        <div className="destinationInfoCard">

          <div className="infoIcon">
            <FaCalendarAlt />
          </div>

          <div>
            <span>
              Best Time
            </span>

            <strong>
              {destination.bestTimeToVisit ||
                "October - March"}
            </strong>
          </div>

        </div>

      </section>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <div className="destinationDetailsGrid">

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div className="destinationDetailsMain">

          {/* ABOUT */}

          <section className="destinationDetailsCard">

            <div className="detailsSectionTitle">

              <div className="sectionTitleIcon">
                🌍
              </div>

              <div>

                <h2>
                  About {destination.destinationName}
                </h2>

                <p>
                  Everything you need to know before your trip.
                </p>

              </div>

            </div>

            <p className="aboutText">

              {destination.description ||
                `Explore ${destination.destinationName} and experience its unique culture, attractions, natural beauty and local experiences.`}

            </p>

          </section>

          {/* =====================================
    TOP ATTRACTIONS
===================================== */}

<section className="destinationDetailsCard">

  <div className="detailsSectionTitle">

    <div className="sectionTitleIcon">
      🏛️
    </div>

    <div>
      <h2>Top Attractions</h2>

      <p>
        Places worth exploring in {destination.destinationName}.
      </p>
    </div>

  </div>

  <div className="featureGrid">

    {destinationContent.attractions.map(
      (attraction, index) => (

        <button
          key={index}
          className="featureItem interactiveFeature"

          onClick={() =>
            setSelectedFeature({
              type: "Attraction",
              icon: attraction.icon,
              title: attraction.title,
              description: attraction.description,
              tip: attraction.tip
            })
          }
        >

          <span>
            {attraction.icon}
          </span>

          <strong>
            {attraction.title}
          </strong>

          <p>
            {attraction.description}
          </p>

          <small>
            Click to explore →
          </small>

        </button>

      )
    )}

  </div>

</section>
          {/* =====================================
    THINGS TO DO
===================================== */}

<section className="destinationDetailsCard">

  <div className="detailsSectionTitle">

    <div className="sectionTitleIcon">
      🎯
    </div>

    <div>

      <h2>
        Things To Do
      </h2>

      <p>
        Make the most of your visit to{" "}
        {destination.destinationName}.
      </p>

    </div>

  </div>

  <div className="activityList">

    {destinationContent.activities.map(
      (activity, index) => (

        <button
          key={index}
          className="activityItem interactiveActivity"

          onClick={() =>
            setSelectedFeature({
              type: "Activity",
              icon: activity.icon,
              title: activity.title,
              description: activity.description,
              tip: activity.tip
            })
          }
        >

          <span className="activityIcon">
            {activity.icon}
          </span>

          <span>
            {activity.title}
          </span>

          <small>
            →
          </small>

        </button>

      )
    )}

  </div>

</section>

          {/* =====================================
              TRAVEL INFORMATION
          ===================================== */}

          <section className="destinationDetailsCard">

            <div className="detailsSectionTitle">

              <div className="sectionTitleIcon">
                ✈️
              </div>

              <div>

                <h2>
                  Travel Information
                </h2>

                <p>
                  Helpful information for planning your trip.
                </p>

              </div>

            </div>

            <div className="travelInfoGrid">

              <div>

                <span>
                  📅 Best Time to Visit
                </span>

                <strong>
                  {destination.bestTimeToVisit ||
                    "October - March"}
                </strong>

              </div>

              <div>

                <span>
                  💰 Estimated Budget
                </span>

                <strong>
                  ₹{budget.toLocaleString("en-IN")}
                </strong>

              </div>

              <div>

                <span>
                  🌤️ Weather
                </span>

                <strong>

                  {weatherLoading
                    ? "Loading live weather..."
                    : weather
                    ? `${weatherInfo.icon} ${weatherInfo.title}`
                    : destination.weather ||
                      "Weather unavailable"}

                </strong>

              </div>

              <div>

                <span>
                  🎒 Travel Style
                </span>

                <strong>
                  Nature & Adventure
                </strong>

              </div>

            </div>

          </section>

          {/* =====================================
              LIVE WEATHER
          ===================================== */}

          <section className="destinationDetailsCard liveWeatherCard">

            <div className="detailsSectionTitle">

              <div className="sectionTitleIcon weatherTitleIcon">
                <FaCloudSun />
              </div>

              <div>

                <h2>
                  Live Weather
                </h2>

                <p>
                  Current weather conditions at the destination.
                </p>

              </div>

            </div>

            {weatherLoading ? (

              <div className="weatherLoading">

                <div className="weatherSpinner"></div>

                <p>
                  Checking current weather...
                </p>

              </div>

            ) : weather ? (

              <>

                <div className="weatherMain">

                  <div className="weatherCondition">

                    <div className="weatherEmoji">
                      {weatherInfo.icon}
                    </div>

                    <div>

                      <h3>
                        {weatherInfo.title}
                      </h3>

                      <p>
                        {weatherInfo.description}
                      </p>

                      <small>
                        {weather.city}, {weather.country}
                      </small>

                    </div>

                  </div>

                  <div className="weatherTemperature">

                    <strong>
                      {Math.round(
                        weather.temperature
                      )}°C
                    </strong>

                    <span>
                      Feels like{" "}
                      {Math.round(
                        weather.feelsLike
                      )}°C
                    </span>

                  </div>

                </div>

                <div className="weatherStats">

                  <div className="weatherStat">

                    <div className="weatherStatIcon">
                      <FaTemperatureHigh />
                    </div>

                    <div>

                      <span>
                        Temperature
                      </span>

                      <strong>
                        {Math.round(
                          weather.temperature
                        )}°C
                      </strong>

                    </div>

                  </div>

                  <div className="weatherStat">

                    <div className="weatherStatIcon">
                      <FaTint />
                    </div>

                    <div>

                      <span>
                        Humidity
                      </span>

                      <strong>
                        {weather.humidity}%
                      </strong>

                    </div>

                  </div>

                  <div className="weatherStat">

                    <div className="weatherStatIcon">
                      <FaWind />
                    </div>

                    <div>

                      <span>
                        Wind Speed
                      </span>

                      <strong>
                        {Math.round(
                          weather.windSpeed
                        )} km/h
                      </strong>

                    </div>

                  </div>

                </div>

              </>

            ) : (

              <div className="weatherError">

                <span>
                  🌤️
                </span>

                <p>
                  {weatherError ||
                    "Live weather is currently unavailable."}
                </p>

                <button
                  onClick={fetchWeather}
                >
                  Try Again
                </button>

              </div>

            )}

          </section>

        </div>

        {/* =====================================
            RIGHT SIDEBAR
        ===================================== */}

        <aside className="destinationSidebar">

          {/* PLAN TRIP */}

          <div className="planTripCard">

            <div className="planIcon">
              <FaPlane />
            </div>

            <h2>
              Ready for an adventure?
            </h2>

            <p>

              Start planning your trip to{" "}

              <strong>
                {destination.destinationName}
              </strong>.

            </p>

            <button
              onClick={() =>
                navigate("/create-trip")
              }
            >
              <FaRoute />
              Plan a Trip
            </button>

          </div>

          {/* BUDGET */}

          <div className="budgetDetailsCard">

            <h3>
              💰 Estimated Trip Budget
            </h3>

            <div className="bigBudget">

              ₹{budget.toLocaleString("en-IN")}

            </div>

            <p>
              Estimated budget for exploring this destination.
            </p>

          </div>

          {/* MAP */}

          <div className="mapCard">

            <div className="mapHeader">

              <h3>

                <FaMap />

                Location

              </h3>

            </div>

            <iframe
              title="Destination Map"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              allowFullScreen
            ></iframe>

          </div>

                </aside>

      </div>


      {/* =====================================
          FEATURE DETAILS MODAL
      ===================================== */}

      {selectedFeature && (

        <div
          className="featureModalOverlay"
          onClick={() => setSelectedFeature(null)}
        >

          <div
            className="featureModal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="featureModalClose"
              onClick={() => setSelectedFeature(null)}
            >
              <FaTimes />
            </button>


            <div className="featureModalIcon">
              {selectedFeature.icon}
            </div>


            <span className="featureModalType">
              {selectedFeature.type}
            </span>


            <h2>
              {selectedFeature.title}
            </h2>


            <p className="featureModalDescription">
              {selectedFeature.description}
            </p>


            <div className="featureModalTip">

              <strong>
                💡 Travel Tip
              </strong>

              <p>
                {selectedFeature.tip}
              </p>

            </div>


            <button
              className="featureModalDone"
              onClick={() => setSelectedFeature(null)}
            >
              Got it
            </button>

          </div>

        </div>

      )}


    </div>
  );
}


export default DestinationDetails;
