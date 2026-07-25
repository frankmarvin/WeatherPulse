export function weatherCodeInfo(code: number, isDay = 1): { label: string; icon: string } {
  const map: Record<number, string> = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Dense drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Heavy showers",
    82: "Violent showers",
    85: "Snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm w/ hail",
    99: "Severe thunderstorm",
  };
  const iconMap: Record<number, string> = {
    0: isDay ? "sun" : "moon",
    1: isDay ? "sun" : "moon",
    2: "cloud-sun",
    3: "cloud",
    45: "cloud-fog",
    48: "cloud-fog",
    51: "cloud-drizzle",
    53: "cloud-drizzle",
    55: "cloud-drizzle",
    61: "cloud-rain",
    63: "cloud-rain",
    65: "cloud-rain-wind",
    66: "cloud-hail",
    67: "cloud-hail",
    71: "cloud-snow",
    73: "cloud-snow",
    75: "snowflake",
    77: "snowflake",
    80: "cloud-rain",
    81: "cloud-rain-wind",
    82: "cloud-rain-wind",
    85: "cloud-snow",
    86: "cloud-snow",
    95: "cloud-lightning",
    96: "cloud-lightning",
    99: "cloud-lightning",
  };
  return { label: map[code] ?? "Unknown", icon: iconMap[code] ?? "cloud" };
}

export function aqiLevel(aqi: number): { label: string; color: string; tone: string } {
  if (aqi <= 20) return { label: "Good", color: "#22C55E", tone: "good" };
  if (aqi <= 40) return { label: "Fair", color: "#84CC16", tone: "fair" };
  if (aqi <= 60) return { label: "Moderate", color: "#F59E0B", tone: "moderate" };
  if (aqi <= 80) return { label: "Poor", color: "#EF4444", tone: "poor" };
  return { label: "Very Poor", color: "#7C3AED", tone: "danger" };
}

export function formatTime(iso: string, opts: Intl.DateTimeFormatOptions = { hour: "numeric" }) {
  try {
    return new Date(iso).toLocaleTimeString([], opts);
  } catch {
    return iso;
  }
}

export function formatDay(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "short" }) {
  try {
    return new Date(iso).toLocaleDateString([], opts);
  } catch {
    return iso;
  }
}

export function windDir(deg: number) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}
