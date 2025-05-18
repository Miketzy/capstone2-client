import React, { useEffect, useState } from "react";
import API_URL from "../../../Config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import axios from "axios";

function Graph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/speciesCounts`)
      .then((res) => {
        const counts = res.data;

        // Step 1: Create array with counts as numbers
        const categories = [
          { name: "Mammals", count: Number(counts.mammals), color: "#4CAF50" },
          { name: "Fish", count: Number(counts.fish), color: "#4CAF50" },
          { name: "Birds", count: Number(counts.birds), color: "#4CAF50" },
          {
            name: "Reptiles",
            count: Number(counts.reptiles),
            color: "#4CAF50",
          },
          {
            name: "Amphibians",
            count: Number(counts.amphibians),
            color: "#4CAF50",
          },
          { name: "Insects", count: Number(counts.insects), color: "#4CAF50" },
          {
            name: "Arachnids",
            count: Number(counts.arachnids),
            color: "#4CAF50",
          },
          {
            name: "Mollusks",
            count: Number(counts.mollusks),
            color: "#4CAF50",
          },
          {
            name: "Echinoderms",
            count: Number(counts.echinoderms),
            color: "#4CAF50",
          },
          {
            name: "Cnidarians",
            count: Number(counts.cnidarians),
            color: "#4CAF50",
          },
          { name: "Worms", count: Number(counts.worms), color: "#4CAF50" },
          { name: "Sponges", count: Number(counts.sponges), color: "#4CAF50" },
        ];

        // Step 2: Compute total count
        const totalCount = categories.reduce(
          (sum, item) => sum + item.count,
          0
        );

        // Step 3: Add percent to each item
        const updatedData = categories.map((item) => ({
          ...item,
          percent:
            totalCount > 0 ? ((item.count / totalCount) * 100).toFixed(1) : 0,
        }));

        setData(updatedData);
      })
      .catch((err) => {
        console.error("Error fetching species counts:", err);
      });
  }, []);

  const formatNumber = (number) => {
    if (number >= 1_000_000) return (number / 1_000_000).toFixed(1) + "M";
    if (number >= 1_000) return (number / 1_000).toFixed(1) + "K";
    return number;
  };

  const maxCount = Math.max(...data.map((entry) => entry.count), 0);

  return (
    <div className="min-h-screen py-12">
      <div className="mt-1 p-8 bg-white rounded-lg shadow-2xl max-w-7xl mx-auto">
        <div className="flex justify-center overflow-x-auto">
          <div
            style={{
              width: data.length > 8 ? `${data.length * 100}px` : "100%",
            }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  fontSize={14}
                  fill="#4B5563"
                />
                <YAxis
                  fontSize={14}
                  tickFormatter={formatNumber}
                  fill="#4B5563"
                  domain={[0, maxCount]}
                />
                <Tooltip
                  formatter={(value, name, props) => {
                    const percent = props.payload.percent;
                    return [`${value} (${percent}%)`, "Count"];
                  }}
                />
                <Legend />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList
                    dataKey="count"
                    content={({ x, y, width, height, value, index }) => {
                      const item = data[index];
                      return (
                        <text
                          x={x + width / 2}
                          y={y - 10}
                          fill="#4B5563"
                          textAnchor="middle"
                          fontSize={12}
                        >
                          {`${value} (${item.percent}%)`}
                        </text>
                      );
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graph;
