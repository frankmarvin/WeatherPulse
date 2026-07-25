import { useEffect } from "react";
import { useState } from "react";
import {
  getWeatherData,
  searchCity
} from "../services/weatherApi";
import { getAirQuality } from "../services/airQualityApi";

export const useWeather = () => {
  const [weather, setWeather] =
    useState(null);

  const [airQuality, setAirQuality] =
    useState(null);

  const [city, setCity] =
    useState("Nairobi");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchWeather = async (
    cityName = city
  ) => {
    try {
      setLoading(true);
      setError(null);

      const locations =
        await searchCity(cityName);

      if (!locations.length)
        throw new Error("City not found");

      const selected = locations[0];

      const weatherData =
        await getWeatherData(
          selected.latitude,
          selected.longitude
        );

      const aqi =
        await getAirQuality(
          selected.latitude,
          selected.longitude
        );

      setWeather({
        city: selected.name,
        country: selected.country,
        lat: selected.latitude,
        lon: selected.longitude,
        ...weatherData
      });

      setAirQuality(aqi);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    const interval =
      setInterval(() => {
        fetchWeather();
      }, 60000);

    return () =>
      clearInterval(interval);
  }, []);

  return {
    weather,
    airQuality,
    city,
    setCity,
    loading,
    error,
    fetchWeather
  };
};
