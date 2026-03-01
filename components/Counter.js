"use client";
import { useEffect, useState } from "react";

export default function Counter({ value, label }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const step = value / (duration / 16);

    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="counter">
      <h1>{display}</h1>
      <p>{label}</p>
    </div>
  );
}