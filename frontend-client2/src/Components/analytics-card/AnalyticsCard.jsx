import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  Legend as BarLegend,
  ResponsiveContainer as BarResponsiveContainer,
} from "recharts";

function AnalyticsCard() {
  // Sample data for species comparison (Bar Chart)
  const speciesComparisonData = [
    { name: "Mammals", value: 40 },
    { name: "Fish", value: 30 },
    { name: "Birds", value: 20 },
    { name: "Reptiles", value: 10 },
  ];

  // Sample data for endangered status (Pie Chart)
  const endangeredStatusData = [
    { name: "Endangered", value: 45 },
    { name: "Vulnerable", value: 35 },
    { name: "Extinct", value: 10 },
    { name: "Near Threatened", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "1fr 1fr",
        padding: "20px",
      }}
    >
      {/* Card for Species Comparison (Bar Graph) */}
      <div
        style={{
          background: "#f0f4f8",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>
          Species Comparison (Bar Graph)
        </h2>
        <BarResponsiveContainer width="100%" height={250}>
          <BarChart data={speciesComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <BarTooltip />
            <BarLegend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </BarResponsiveContainer>
      </div>

      {/* Card for Endangered Status (Pie Chart) */}
      <div
        style={{
          background: "#f0f4f8",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "16px", fontSize: "20px" }}>
          Endangered Status (Pie Chart)
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={endangeredStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {endangeredStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsCard;
