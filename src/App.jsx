import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useWeather }
from "./hooks/useWeather";

function App() {

  const [darkMode, setDarkMode] =
    useState(true);

  const {
    weather,
    airQuality,
    fetchWeather
  } = useWeather();

  return (
    <div
      className={
        darkMode ? "dark" : ""
      }
    >
      <div
        className="
          min-h-screen
          gradient-bg
          text-white
        "
      >
        <Navbar
          darkMode={darkMode}
          setDarkMode={
            setDarkMode
          }
        />

        <Home
          weather={weather}
          airQuality={
            airQuality
          }
          fetchWeather={
            fetchWeather
          }
        />
      </div>
    </div>
  );
}

export default App;
