import React from "react";

function AnalyticsCard() {
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "1fr 1fr",
        padding: "20px",
      }}
    >
      {/* Card for Bar Chart Intro */}
      <div
        style={{
          background: "#f0f4f8",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>
          Species Comparison (Bar Graph) - Introduction
        </h2>
        <p style={{ fontSize: "14px", color: "#555" }}>
          This bar graph compares different species categories such as Mammals,
          Fish, Birds, and Reptiles. It provides a visual representation of
          their relative numbers. The data used here is a sample for comparison
          purposes.
        </p>
      </div>

      {/* Card for Pie Chart Intro */}
      <div
        style={{
          background: "#f0f4f8",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>
          Endangered Status (Pie Chart) - Introduction
        </h2>
        <p style={{ fontSize: "14px", color: "#555" }}>
          The pie chart below illustrates the status of different species in
          terms of their conservation levels. It shows the percentage of species
          that are Endangered, Vulnerable, Extinct, or Near Threatened.
        </p>
      </div>
    </div>
  );
}

export default AnalyticsCard;
