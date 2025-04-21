import React from "react";

function AnalyticsCard() {
  return (
    <div className="flex items-center justify-center min-h-screen pt-24 bg-green-100">
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card for Bar Chart Intro */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 border-b-2 border-teal-600 pb-2">
              Species Comparison (Bar Graph) - Introduction
            </h2>
            <p className="text-sm text-gray-600">
              This bar graph compares different species categories such as
              Mammals, Fish, Birds, and Reptiles. It provides a visual
              representation of their relative numbers. The data used here is a
              sample for comparison purposes.
            </p>
          </div>

          {/* Card for Pie Chart Intro */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 border-b-2 border-teal-600 pb-2">
              Endangered Status (Pie Chart) - Introduction
            </h2>
            <p className="text-sm text-gray-600">
              The pie chart below illustrates the status of different species in
              terms of their conservation levels. It shows the percentage of
              species that are Endangered, Vulnerable, Extinct, or Near
              Threatened.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
