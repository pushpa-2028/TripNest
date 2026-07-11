import "../styles/Home.css";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Explore the World with <span>TripNest</span>
          </h1>

          <p>
            Plan your dream vacation, manage your trips,
            track expenses and create unforgettable memories.
          </p>

          <button>Start Planning</button>
        </div>
      </section>

      {/* Destinations */}

      <section className="destinations">

        <h2>Popular Destinations</h2>

        <div className="cards">

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600"
              alt=""
            />
            <h3>Goa</h3>
            <p>Beautiful beaches and nightlife.</p>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600"
              alt=""
            />
            <h3>Paris</h3>
            <p>The city of lights and romance.</p>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
              alt=""
            />
            <h3>Switzerland</h3>
            <p>Snowy mountains and scenic beauty.</p>
          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>Why Choose TripNest?</h2>

        <div className="feature-container">

          <div className="feature-box">
            <h3>🧳 Smart Trip Planning</h3>
            <p>Create complete travel plans in minutes.</p>
          </div>

          <div className="feature-box">
            <h3>💰 Budget Tracker</h3>
            <p>Track every expense during your journey.</p>
          </div>

          <div className="feature-box">
            <h3>📅 Day-wise Itinerary</h3>
            <p>Organize your travel day by day.</p>
          </div>

          <div className="feature-box">
            <h3>👨‍👩‍👧 Group Trips</h3>
            <p>Invite friends and travel together.</p>
          </div>

        </div>

      </section>
    </>
  );
}

export default Home;