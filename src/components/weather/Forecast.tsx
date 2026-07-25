import { motion } from "framer-motion";
import type { WeatherBundle } from "@/services/weatherApi";
import { formatDay, formatTime } from "@/utils/helpers";
import { WeatherIcon } from "./WeatherIcon";

export function HourlyForecast({ data }: { data: WeatherBundle }) {
  const now = new Date(data.current.time).getTime();
  const hours = data.hourly.time
    .map((t, i) => ({
      t,
      temp: Math.round(data.hourly.temperature[i]),
      code: data.hourly.weatherCode[i],
      wind: Math.round(data.hourly.windSpeed[i]),
      rain: data.hourly.precipProb[i],
    }))
    .filter((h) => {
      const ms = new Date(h.t).getTime();
      return ms >= now && ms <= now + 24 * 3600_000;
    })
    .slice(0, 24);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass p-5"
    >
      <h3 className="mb-4 text-base font-semibold">Hourly Forecast</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {hours.map((h) => (
          <div
            key={h.t}
            className="flex min-w-[76px] flex-col items-center gap-2 rounded-xl border border-border/50 bg-white/5 p-3 backdrop-blur"
          >
            <div className="text-xs text-muted-foreground">{formatTime(h.t, { hour: "numeric" })}</div>
            <WeatherIcon code={h.code} className="h-6 w-6 text-primary" />
            <div className="text-base font-semibold">{h.temp}°</div>
            <div className="text-[10px] text-muted-foreground">{h.rain}%</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function DailyForecast({ data }: { data: WeatherBundle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass p-5"
    >
      <h3 className="mb-4 text-base font-semibold">7-Day Forecast</h3>
      <div className="divide-y divide-border/50">
        {data.daily.time.map((t, i) => (
          <div key={t} className="flex items-center gap-4 py-3">
            <div className="w-14 text-sm font-medium">
              {i === 0 ? "Today" : formatDay(t)}
            </div>
            <WeatherIcon code={data.daily.weatherCode[i]} className="h-6 w-6 text-primary" />
            <div className="flex-1 text-xs text-muted-foreground">
              {data.daily.precipProb[i] ?? 0}% rain
            </div>
            <div className="w-24 text-right text-sm">
              <span className="text-muted-foreground">{Math.round(data.daily.tempMin[i])}°</span>
              <span className="mx-1 text-muted-foreground">/</span>
              <span className="font-semibold">{Math.round(data.daily.tempMax[i])}°</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
