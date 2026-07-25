import { motion } from "framer-motion";
import { Droplets, Gauge, Sun, Wind } from "lucide-react";
import type { WeatherBundle } from "@/services/weatherApi";
import { aqiLevel, windDir } from "@/utils/helpers";

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  color,
  delay,
}: {
  icon: typeof Sun;
  label: string;
  value: string;
  sub?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div
          className="grid h-9 w-9 place-items-center rounded-full"
          style={{ background: `${color}22`, color }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </motion.div>
  );
}

export function KpiCards({ data }: { data: WeatherBundle }) {
  const aq = data.airQuality ? aqiLevel(data.airQuality.aqi) : null;
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Kpi
        icon={Sun}
        label="Temperature"
        value={`${Math.round(data.current.temperature)}°`}
        sub={`Feels like ${Math.round(data.current.apparentTemperature)}°`}
        color="#F59E0B"
        delay={0.05}
      />
      <Kpi
        icon={Droplets}
        label="Humidity"
        value={`${data.current.humidity}%`}
        sub="Relative"
        color="#06B6D4"
        delay={0.1}
      />
      <Kpi
        icon={Wind}
        label="Wind"
        value={`${Math.round(data.current.windSpeed)} km/h`}
        sub={windDir(data.current.windDirection)}
        color="#3B82F6"
        delay={0.15}
      />
      <Kpi
        icon={Gauge}
        label="Air Quality"
        value={aq ? String(Math.round(data.airQuality!.aqi)) : "—"}
        sub={aq?.label}
        color={aq?.color ?? "#22C55E"}
        delay={0.2}
      />
    </div>
  );
}
