import { CloudSun } from "lucide-react";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CloudSun size={28} />
          <h1 className="text-2xl font-bold">
            WeatherPulse
          </h1>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
