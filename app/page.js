"use client";

import { useEffect, useState } from "react";
import Counter from "../components/Counter";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/weather")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data.length) return <p>Loading...</p>;

  const avgTemp =
    data.reduce((acc, c) => acc + c.weather.temperature, 0) / data.length;

  return (
    <div style={{ background: "#111", color: "#fff", padding: "20px" }}>
      <h1>🌍 Global Weather Live Monitor</h1>

      <div style={{ display: "flex", gap: "40px" }}>
        <Counter value={Math.round(avgTemp)} label="Average Temp °C" />
        <Counter value={data.length} label="Cities Monitored" />
      </div>

      <MapView data={data} />
    </div>
  );
}