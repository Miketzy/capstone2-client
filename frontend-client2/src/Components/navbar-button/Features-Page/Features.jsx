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
              The Species Directory provides users with an extensive list of
              species information, and even categorized species class. Here,
              users can explore each species' details, habitats, and unique
              characteristics, offering a gateway to understanding biodiversity
              on a deeper level.
            </p>
          </section>

          <section className="feature-card">
            <h2>Interactive Map of Species Locations</h2>
            <p>
              Our interactive Mapping System visually connects users to the
              geographical distribution of various species. By highlighting
              specific areas where species are found, this feature helps users
              learn about the ecosystems supporting each species and gain
              insights into biodiversity patterns across Davao Oriental region.
            </p>
          </section>

          <section className="feature-card">
            <h2>Contribute Species Data</h2>
            <p>
              In this section, Contributors can actively contribute by adding
              information about species, helping us keep the database
              comprehensive and up-to-date. This feature allows users to
              participate in a collaborative effort to expand knowledge and
              foster community-driven conservation.
            </p>
          </section>

          <section className="feature-card">
            <h2>Species Conservation</h2>
            <p>
              Our Species Conservation section focuses on educating users about
              conservation efforts and the roles they can play. This feature
              offers tips, action plans, and resources for preserving
              biodiversity, encouraging users to become proactive stewards of
              nature.
            </p>
          </section>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Features;
