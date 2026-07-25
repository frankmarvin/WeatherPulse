import axios from "axios";

export const getAirQuality = async (
  latitude,
  longitude
) => {
  const response = await axios.get(
    "https://air-quality-api.open-meteo.com/v1/air-quality",
    {
      params: {
        latitude,
        longitude,
        current:
          "pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone"
      }
    }
  );

  return response.data;
};
