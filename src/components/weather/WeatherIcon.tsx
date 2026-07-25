import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Moon,
  Snowflake,
  Sun,
} from "lucide-react";
import { weatherCodeInfo } from "@/utils/helpers";

const map = {
  sun: Sun,
  moon: Moon,
  "cloud-sun": CloudSun,
  cloud: Cloud,
  "cloud-fog": CloudFog,
  "cloud-drizzle": CloudDrizzle,
  "cloud-rain": CloudRain,
  "cloud-rain-wind": CloudRainWind,
  "cloud-hail": CloudHail,
  "cloud-snow": CloudSnow,
  snowflake: Snowflake,
  "cloud-lightning": CloudLightning,
} as const;

export function WeatherIcon({
  code,
  isDay = 1,
  className,
}: {
  code: number;
  isDay?: number;
  className?: string;
}) {
  const { icon } = weatherCodeInfo(code, isDay);
  const Icon = (map as Record<string, typeof Sun>)[icon] ?? Cloud;
  return <Icon className={className} strokeWidth={1.6} />;
}
