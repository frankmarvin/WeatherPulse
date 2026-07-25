import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CloudSun, Moon, RefreshCw, Sun } from "lucide-react";
import { fetchWeather, reverseGeocode, type GeoResult } from "@/services/weatherApi";
import { SearchBar } from "@/components/weather/SearchBar";
import { CurrentCard } from "@/components/weather/CurrentCard";
import { KpiCards } from "@/components/weather/KpiCards";
import { WeatherCharts } from "@/components/weather/WeatherCharts";
import { DailyForecast, HourlyForecast } from "@/components/weather/Forecast";
import { AirQualityCard } from "@/components/weather/AirQuality";
import { AlertsPanel } from "@/components/weather/AlertsPanel";
import { WeatherMap } from "@/components/weather/WeatherMap";
import { DashboardSkeleton } from "@/components/weather/Skeleton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WeatherPulse — Real-Time Weather Dashboard" },
      {
        name: "description",
        content:
          "Live weather, hourly & 7-day forecasts, interactive charts, air quality and severe-weather alerts for any city worldwide.",
      },
      { property: "og:title", content: "WeatherPulse — Real-Time Weather Dashboard" },
      {
        property: "og:description",
        content: "Beautiful real-time weather dashboard powered by Open-Meteo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const DEFAULT_LOC: GeoResult = {
  id: 184745,
  name: "Nairobi",
  country: "Kenya",
  admin1: "Nairobi",
  latitude: -1.2921,
  longitude: 36.8219,
  timezone: "Africa/Nairobi",
};

const RECENT_KEY = "wp:recent";
const THEME_KEY = "wp:theme";

function Home() {
  const [loc, setLoc] = useState<GeoResult>(DEFAULT_LOC);
  const [recent, setRecent] = useState<GeoResult[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const r = localStorage.getItem(RECENT_KEY);
      if (r) setRecent(JSON.parse(r));
      const t = (localStorage.getItem(THEME_KEY) as "light" | "dark" | null) ?? "dark";
      setTheme(t);
    } catch {}
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme, hydrated]);

  const query = useQuery({
    queryKey: ["weather", loc.latitude, loc.longitude],
    queryFn: () => fetchWeather(loc),
    refetchInterval: 60_000,
    staleTime: 60_000,
  });

  const handleSelect = useCallback((r: GeoResult) => {
    setLoc(r);
    setRecent((prev) => {
      const next = [r, ...prev.filter((p) => p.id !== r.id || p.name !== r.name)].slice(0, 5);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const g = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
        setLoc(g);
      },
      () => {},
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    try {
      localStorage.removeItem(RECENT_KEY);
    } catch {}
  }, []);

  const lastUpdated = useMemo(() => {
    if (!query.dataUpdatedAt) return null;
    return new Date(query.dataUpdatedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [query.dataUpdatedAt]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl grad-primary text-white shadow-lg">
            <CloudSun className="h-6 w-6" />
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-bold tracking-tight">WeatherPulse</div>
            <div className="-mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              Real-time dashboard
            </div>
          </div>
        </motion.div>
        <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:max-w-xl">
          <SearchBar
            onSelect={handleSelect}
            onGeolocate={handleGeolocate}
            recent={recent}
            onClearRecent={clearRecent}
          />
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className="glass grid h-12 w-12 shrink-0 place-items-center transition-transform hover:scale-105"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {loc.name}
            {loc.admin1 ? `, ${loc.admin1}` : ""}
            {loc.country ? ` · ${loc.country}` : ""}
          </span>
          <div className="flex items-center gap-2">
            {lastUpdated && <span>Updated {lastUpdated}</span>}
            <button
              aria-label="Refresh"
              onClick={() => query.refetch()}
              className="rounded-full p-1.5 hover:bg-white/10"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${query.isFetching ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {query.isPending ? (
          <DashboardSkeleton />
        ) : query.isError ? (
          <div className="glass p-10 text-center">
            <div className="text-lg font-semibold">Couldn't load weather</div>
            <p className="mt-2 text-sm text-muted-foreground">
              The forecast service didn't respond. Please try again.
            </p>
            <button
              onClick={() => query.refetch()}
              className="mt-4 rounded-lg grad-primary px-4 py-2 text-sm font-medium text-white"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <AlertsPanel data={query.data} />
            <CurrentCard data={query.data} />
            <KpiCards data={query.data} />
            <HourlyForecast data={query.data} />
            <WeatherCharts data={query.data} />
            <div className="grid gap-6 lg:grid-cols-2">
              <DailyForecast data={query.data} />
              <AirQualityCard data={query.data} />
            </div>
            <WeatherMap loc={query.data.location} />
            <footer className="pt-8 text-center text-xs text-muted-foreground">
              Data by Open-Meteo · Map by Windy · Built with WeatherPulse
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
