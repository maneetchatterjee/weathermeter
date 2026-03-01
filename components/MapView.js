"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ data }) {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((city, i) => (
        <CircleMarker
          key={i}
          center={[city.lat, city.lon]}
          radius={city.weather.temperature}
          pathOptions={{ color: "blue" }}
        >
          <Popup>
            <b>{city.name}</b><br/>
            Temp: {city.weather.temperature}°C<br/>
            Wind: {city.weather.windspeed} km/h
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}