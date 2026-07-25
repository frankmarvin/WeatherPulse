import { motion } from "framer-motion";
import type { GeoResult } from "@/services/weatherApi";

export function WeatherMap({ loc }: { loc: GeoResult }) {
  // Embedded Windy map — no key required; includes temp/rain/wind layers with pan/zoom.
  const src = `https://embed.windy.com/embed2.html?lat=${loc.latitude}&lon=${loc.longitude}&detailLat=${loc.latitude}&detailLon=${loc.longitude}&width=650&height=450&zoom=6&level=surface&overlay=temp&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&metricWind=default&metricTemp=default&radarRange=-1`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass overflow-hidden p-2"
    >
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-base font-semibold">Weather Map</h3>
        <span className="text-xs text-muted-foreground">Temp · Rain · Wind layers</span>
      </div>
      <div className="h-[420px] w-full overflow-hidden rounded-xl">
        <iframe
          title="Weather map"
          src={src}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
