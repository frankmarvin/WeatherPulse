import axios from "axios";

const GEO_BASE =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_BASE =
  "https://api.open-meteo.com/v1/forecast";

export const searchCity = async (city) => {
  const response = await axios.get(GEO_BASE, {
    params: {
      name: city,
      count: 5
    }
  });

  return response.data.results || [];
};

export const getWeatherData = async (
  latitude,
  longitude
) => {
  const response = await axios.get(WEATHER_BASE, {
    params: {
      latitude,
      longitude,

      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m",

      hourly:
        "temperature_2m,relative_humidity_2m,wind_speed_10m",

      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",

      forecast_days: 7,
      timezone: "auto"
    }
  });

  return response.data;
};
