// Open-Meteo API service — no key required.

export interface GeoResult {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface WeatherBundle {
  location: GeoResult;
  current: {
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    uvIndex: number;
    visibility: number;
    weatherCode: number;
    isDay: number;
    time: string;
  };
  daily: {
    time: string[];
    weatherCode: number[];
    tempMax: number[];
    tempMin: number[];
    precipProb: number[];
    sunrise: string[];
    sunset: string[];
    uvMax: number[];
  };
  hourly: {
    time: string[];
    temperature: number[];
    humidity: number[];
    windSpeed: number[];
    precipProb: number[];
    weatherCode: number[];
  };
  airQuality?: {
    aqi: number;
    pm2_5: number;
    pm10: number;
    co: number;
    no2: number;
    o3: number;
  };
}

export async function searchCities(query: string): Promise<GeoResult[]> {
  if (!query.trim()) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to search cities");
  const data = await res.json();
  return (data.results ?? []) as GeoResult[];
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeoResult> {
  // Open-Meteo doesn't offer reverse; fallback to a synthetic name.
  return {
    id: 0,
    name: "My Location",
    country: "",
    latitude: lat,
    longitude: lon,
    timezone: "auto",
  };
}

export async function fetchWeather(loc: GeoResult): Promise<WeatherBundle> {
  const base = "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({
    latitude: String(loc.latitude),
    longitude: String(loc.longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m,uv_index,visibility",
    hourly:
      "temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7",
  });
  const [wxRes, aqRes] = await Promise.all([
    fetch(`${base}?${params.toString()}`),
    fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${loc.latitude}&longitude=${loc.longitude}&current=european_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,ozone`,
    ).catch(() => null),
  ]);
  if (!wxRes.ok) throw new Error("Failed to fetch weather");
  const w = await wxRes.json();

  let airQuality: WeatherBundle["airQuality"] | undefined;
  if (aqRes && aqRes.ok) {
    const a = await aqRes.json();
    const c = a.current ?? {};
    airQuality = {
      aqi: c.european_aqi ?? 0,
      pm2_5: c.pm2_5 ?? 0,
      pm10: c.pm10 ?? 0,
      co: c.carbon_monoxide ?? 0,
      no2: c.nitrogen_dioxide ?? 0,
      o3: c.ozone ?? 0,
    };
  }

  return {
    location: loc,
    current: {
      temperature: w.current.temperature_2m,
      apparentTemperature: w.current.apparent_temperature,
      humidity: w.current.relative_humidity_2m,
      windSpeed: w.current.wind_speed_10m,
      windDirection: w.current.wind_direction_10m,
      pressure: w.current.pressure_msl,
      uvIndex: w.current.uv_index ?? 0,
      visibility: w.current.visibility ?? 0,
      weatherCode: w.current.weather_code,
      isDay: w.current.is_day,
      time: w.current.time,
    },
    daily: {
      time: w.daily.time,
      weatherCode: w.daily.weather_code,
      tempMax: w.daily.temperature_2m_max,
      tempMin: w.daily.temperature_2m_min,
      precipProb: w.daily.precipitation_probability_max,
      sunrise: w.daily.sunrise,
      sunset: w.daily.sunset,
      uvMax: w.daily.uv_index_max,
    },
    hourly: {
      time: w.hourly.time,
      temperature: w.hourly.temperature_2m,
      humidity: w.hourly.relative_humidity_2m,
      windSpeed: w.hourly.wind_speed_10m,
      precipProb: w.hourly.precipitation_probability,
      weatherCode: w.hourly.weather_code,
    },
    airQuality,
  };
}
