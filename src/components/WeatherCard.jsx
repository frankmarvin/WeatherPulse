import { motion } from "framer-motion";
import { getWeatherText }
from "../utils/weatherIcons";

function WeatherCard({ weather }) {

  if (!weather) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="
        glass
        rounded-3xl
        p-8
      "
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-4xl font-bold">
            {weather.city}
          </h2>

          <p className="opacity-70">
            {weather.country}
          </p>
        </div>

        <div className="text-right">
          <div className="text-6xl">
            🌤️
          </div>
        </div>
      </div>

      <h1 className="text-8xl font-bold mt-8">
        {Math.round(
          weather.current.temperature_2m
        )}
        °
      </h1>

      <p className="mt-4 text-xl">
        {getWeatherText(
          weather.current.weather_code
        )}
      </p>
    </motion.div>
  );
}

export default WeatherCard;
