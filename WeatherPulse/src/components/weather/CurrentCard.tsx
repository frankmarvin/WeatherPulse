import { motion } from "framer-motion";
import { Eye, Gauge, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";
import type { WeatherBundle } from "@/services/weatherApi";
import { formatTime, weatherCodeInfo, windDir } from "@/utils/helpers";
import { WeatherIcon } from "./WeatherIcon";

export function CurrentCard({ data }: { data: WeatherBundle }) {
  const info = weatherCodeInfo(data.current.weatherCode, data.current.isDay);
  const sr = data.daily.sunrise[0];
  const ss = data.daily.sunset[0];

  const stats = [
    { icon: Thermometer, label: "Feels", value: `${Math.round(data.current.apparentTemperature)}°` },
    { icon: Wind, label: "Wind", value: `${Math.round(data.current.windSpeed)} km/h ${windDir(data.current.windDirection)}` },
    { icon: Gauge, label: "Pressure", value: `${Math.round(data.current.pressure)} hPa` },
    { icon: Eye, label: "Visibility", value: `${Math.round((data.current.visibility ?? 0) / 1000)} km` },
    { icon: Sunrise, label: "Sunrise", value: formatTime(sr, { hour: "2-digit", minute: "2-digit" }) },
    { icon: Sunset, label: "Sunset", value: formatTime(ss, { hour: "2-digit", minute: "2-digit" }) },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass relative overflow-hidden p-6 lg:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl grad-primary" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">
            {data.location.name}
            {data.location.country ? `, ${data.location.country}` : ""}
          </div>
          <div className="mt-2 flex items-end gap-4">
            <div className="text-7xl font-semibold tracking-tighter lg:text-8xl">
              {Math.round(data.current.temperature)}°
            </div>
            <div className="pb-3">
              <div className="text-lg font-medium">{info.label}</div>
              <div className="text-sm text-muted-foreground">
                UV {Math.round(data.current.uvIndex)}
              </div>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-40 w-40 place-items-center rounded-full grad-primary text-white shadow-2xl"
        >
          <WeatherIcon code={data.current.weatherCode} isDay={data.current.isDay} className="h-20 w-20" />
        </motion.div>
      </div>

      <div className="relative mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="rounded-xl border border-border/50 bg-white/5 p-3 backdrop-blur"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <s.icon className="h-3.5 w-3.5" />
              {s.label}
            </div>
            <div className="mt-1 font-medium">{s.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
