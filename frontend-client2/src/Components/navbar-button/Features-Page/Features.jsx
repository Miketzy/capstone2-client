import React from "react";
import "./Features.css";
function Features() {
  return (
    <div className="features-container">
      <div className="features-Wrapper">
        <header className="features-header">
          <h1>Explore Our Key Features</h1>
          <p>
            Discover the unique tools and functionalities that make our platform
            your go-to resource for exploring species in Davao Oriental. From
            interactive maps to community-driven data, we offer a rich
            experience for all users.
          </p>
        </header>

        <div className="features-grid">
          <section className="feature-card">
            <h2>Comprehensive Species Directory</h2>
            <p>
              Explore a wide range of species native to Davao Oriental with our
              easy-to-navigate species directory. Search by common name,
              scientific name, or classification.
            </p>
          </section>

          <section className="feature-card">
            <h2>Interactive Map of Species Locations</h2>
            <p>
              View real-time locations of species across the region using our
              interactive map, which highlights their habitat and geographical
              distribution.
            </p>
          </section>

          <section className="feature-card">
            <h2>Contribute Species Data</h2>
            <p>
              Submit your species sightings and help expand our database.
              Contributions are reviewed and published to ensure the accuracy of
              our records.
            </p>
          </section>

          <section className="feature-card">
            <h2>Educational Resources</h2>
            <p>
              Access detailed guides, videos, and articles about species,
              biodiversity, and conservation efforts in Davao Oriental.
            </p>
          </section>

          <section className="feature-card">
            <h2>User Profiles and Species Tracking</h2>
            <p>
              Create your profile and track the species you’ve explored or
              contributed to, receive updates on your submissions, and customize
              your experience.
            </p>
          </section>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Features;
