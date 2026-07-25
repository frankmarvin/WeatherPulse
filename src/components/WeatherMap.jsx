import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "../utils/fixLeafletIcon";

function WeatherMap({ weather }) {

  if (!weather) return null;

  const lat = weather.lat;
  const lon = weather.lon;

  return (
    <div
      className="
        glass
        rounded-3xl
        p-4
      "
    >
      <h2 className="text-2xl font-bold mb-4">
        Weather Map
      </h2>

      <MapContainer
        center={[lat, lon]}
        zoom={10}
        scrollWheelZoom={true}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "20px"
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[lat, lon]}
        >
          <Popup>
            <div>
              <h3>{weather.city}</h3>

              <p>
                Temperature:
                {" "}
                {
                  weather.current
                    .temperature_2m
                }
                °C
              </p>

              <p>
                Wind:
                {" "}
                {
                  weather.current
                    .wind_speed_10m
                }
                km/h
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
