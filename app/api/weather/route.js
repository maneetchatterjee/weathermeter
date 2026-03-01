import axios from "axios";

let cachedData = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();

  if (cachedData && now - lastFetch < CACHE_DURATION) {
    return Response.json(cachedData);
  }

  const cities = [
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5072, lon: -0.1276 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Dubai", lat: 25.2048, lon: 55.2708 }
  ];

  const results = await Promise.all(
    cities.map(async (city) => {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
      );
      return {
        ...city,
        weather: res.data.current_weather
      };
    })
  );

  cachedData = results;
  lastFetch = now;

  return Response.json(results);
}