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
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/speciesCounts`)
      .then((res) => {
        const counts = res.data;

        const formattedData = [
          { name: "Mammals", count: counts.mammals || 0, color: "#4CAF50" },
          { name: "Fish", count: counts.fish || 0, color: "#4CAF50" },
          { name: "Birds", count: counts.birds || 0, color: "#4CAF50" },
          { name: "Reptiles", count: counts.reptiles || 0, color: "#4CAF50" },
          {
            name: "Amphibians",
            count: counts.amphibians || 0,
            color: "#4CAF50",
          },
          { name: "Insects", count: counts.insects || 0, color: "#4CAF50" },
          { name: "Arachnids", count: counts.arachnids || 0, color: "#4CAF50" },
          { name: "Mollusks", count: counts.mollusks || 0, color: "#4CAF50" },
          {
            name: "Echinoderms",
            count: counts.echinoderms || 0,
            color: "#4CAF50",
          },
          {
            name: "Cnidarians",
            count: counts.cnidarians || 0,
            color: "#4CAF50",
          },
          { name: "Worms", count: counts.worms || 0, color: "#4CAF50" },
          { name: "Sponges", count: counts.sponges || 0, color: "#4CAF50" },
        ];

        const total = formattedData.reduce((sum, item) => sum + item.count, 0);
        setData(formattedData);
        setTotalCount(total);
      })
      .catch((err) => {
        console.error("Error fetching species counts:", err);
      });
  }, []);

  const formatNumber = (number) => {
    if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + "M";
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1) + "K";
    }
    return number;
  };

  const maxCount = Math.max(...data.map((entry) => entry.count));

  // Custom label with percentage
  const renderCustomizedLabel = (props) => {
    const { x, y, width, value, index } = props;
    const entry = data[index];
    let percent = 0;

    if (totalCount && entry.count > 0) {
      percent = (entry.count / totalCount) * 100;
      percent = percent < 0.1 ? 0.1 : percent;
      percent = percent.toFixed(1);
    }

    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#4B5563"
        textAnchor="middle"
        fontSize={12}
      >
        {`${formatNumber(value)} (${percent}%)`}
      </text>
    );
  };

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
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 50,
                }}
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
                  formatter={(value) =>
                    `${formatNumber(value)} (${(
                      (value / totalCount) *
                      100
                    ).toFixed(1)}%)`
                  }
                />
                <Legend />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList dataKey="count" content={renderCustomizedLabel} />
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
