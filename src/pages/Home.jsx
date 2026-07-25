import {
  Droplets,
  Gauge,
  Wind,
  Thermometer
} from "lucide-react";

import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import AQICard from "../components/AQICard";
import AlertsPanel from "../components/AlertsPanel";
import StatCard from "../components/StatCard";

function Home({
  weather,
  airQuality,
  fetchWeather
}) {

  if (!weather)
    return (
      <div className="text-center">
        Loading...
      </div>
    );

  const current =
    weather.current;

  return (
    <div className="max-w-7xl mx-auto p-6">

      <SearchBar
        onSearch={fetchWeather}
      />

      <div className="mt-6">
        <WeatherCard weather={weather} />
      </div>

      <div
        className="
          grid
          md:grid-cols-4
          gap-5
          mt-6
        "
      >
        <StatCard
          title="Temperature"
          value={current.temperature_2m}
          unit="°C"
          icon={<Thermometer />}
        />

        <StatCard
          title="Humidity"
          value={
            current.relative_humidity_2m
          }
          unit="%"
          icon={<Droplets />}
        />

        <StatCard
          title="Wind"
          value={
            current.wind_speed_10m
          }
          unit=" km/h"
          icon={<Wind />}
        />

        <StatCard
          title="Pressure"
          value={
            current.pressure_msl
          }
          unit=" hPa"
          icon={<Gauge />}
        />
      </div>

      <div
        className="
          grid
          lg:grid-cols-3
          gap-6
          mt-8
        "
      >
        <AQICard
          airQuality={airQuality}
        />

        <div className="lg:col-span-2">
          <AlertsPanel />
        </div>
      </div>

      <h2
        className="
          text-3xl
          font-bold
          mt-10
          mb-4
        "
      >
        7-Day Forecast
      </h2>

      <div
        className="
          grid
          md:grid-cols-4
          lg:grid-cols-7
          gap-4
        "
      >
        {weather.daily.time.map(
          (day, index) => (
            <ForecastCard
              key={day}
              day={day}
              max={
                weather.daily
                  .temperature_2m_max[
                  index
                ]
              }
              min={
                weather.daily
                  .temperature_2m_min[
                  index
                ]
              }
              rain={
                weather.daily
                  .precipitation_probability_max[
                  index
                ]
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default Home;
