import { motion } from "framer-motion";
import type { WeatherBundle } from "@/services/weatherApi";
import { aqiLevel } from "@/utils/helpers";

export function AirQualityCard({ data }: { data: WeatherBundle }) {
  if (!data.airQuality) return null;
  const aq = data.airQuality;
  const level = aqiLevel(aq.aqi);
  const items = [
    { label: "PM2.5", value: aq.pm2_5, unit: "μg/m³" },
    { label: "PM10", value: aq.pm10, unit: "μg/m³" },
    { label: "CO", value: aq.co, unit: "μg/m³" },
    { label: "NO₂", value: aq.no2, unit: "μg/m³" },
    { label: "O₃", value: aq.o3, unit: "μg/m³" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass p-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Air Quality</h3>
        <span
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{ background: `${level.color}22`, color: level.color }}
        >
          {level.label}
        </span>
      </div>
      <div className="mt-4 flex items-end gap-3">
        <div className="text-5xl font-semibold tracking-tight">{Math.round(aq.aqi)}</div>
        <div className="pb-2 text-xs text-muted-foreground">European AQI</div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, aq.aqi)}%`, background: level.color }}
        />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {items.map((i) => (
          <div key={i.label} className="rounded-xl border border-border/50 bg-white/5 p-2 text-center backdrop-blur">
            <div className="text-[10px] text-muted-foreground">{i.label}</div>
            <div className="text-sm font-semibold">{Math.round(i.value * 10) / 10}</div>
            <div className="text-[10px] text-muted-foreground">{i.unit}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
