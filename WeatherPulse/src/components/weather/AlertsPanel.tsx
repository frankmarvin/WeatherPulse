import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CloudRain, Flame, Wind } from "lucide-react";
import type { WeatherBundle } from "@/services/weatherApi";

interface Alert {
  id: string;
  title: string;
  detail: string;
  icon: typeof AlertTriangle;
  color: string;
}

function deriveAlerts(data: WeatherBundle): Alert[] {
  const a: Alert[] = [];
  const c = data.current;
  if ([95, 96, 99].includes(c.weatherCode)) {
    a.push({ id: "storm", title: "Thunderstorm", detail: "Storms in your area — seek shelter.", icon: AlertTriangle, color: "#EF4444" });
  }
  if ([65, 67, 82].includes(c.weatherCode) || (data.hourly.precipProb.slice(0, 12).some((p) => p >= 80))) {
    a.push({ id: "rain", title: "Heavy Rain", detail: "High chance of heavy rain in the next 12h.", icon: CloudRain, color: "#06B6D4" });
  }
  if (c.temperature >= 35) {
    a.push({ id: "heat", title: "Heat Warning", detail: `Temperature at ${Math.round(c.temperature)}° — stay hydrated.`, icon: Flame, color: "#F59E0B" });
  }
  if (c.windSpeed >= 40) {
    a.push({ id: "wind", title: "High Wind Advisory", detail: `Sustained winds at ${Math.round(c.windSpeed)} km/h.`, icon: Wind, color: "#3B82F6" });
  }
  return a;
}

export function AlertsPanel({ data }: { data: WeatherBundle }) {
  const alerts = deriveAlerts(data);
  if (alerts.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {alerts.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass flex items-center gap-4 p-4"
            role="alert"
          >
            <div
              className="grid h-11 w-11 place-items-center rounded-full"
              style={{ background: `${a.color}22`, color: a.color }}
            >
              <a.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{a.title}</div>
              <div className="text-sm text-muted-foreground">{a.detail}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
