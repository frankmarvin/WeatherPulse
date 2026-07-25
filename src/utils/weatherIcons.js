export const weatherDescriptions = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing Rime Fog",
  51: "Light Drizzle",
  61: "Rain",
  71: "Snow",
  95: "Thunderstorm"
};

export const getWeatherText = (
  code
) => {
  return (
    weatherDescriptions[code] ||
    "Unknown"
  );
};
