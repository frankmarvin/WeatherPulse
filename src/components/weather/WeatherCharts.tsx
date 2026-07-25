import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeatherBundle } from "@/services/weatherApi";
import { formatTime } from "@/utils/helpers";

function ChartCard({
  title,
  subtitle,
  children,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass p-5"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

const tooltipStyle = {
  background: "rgba(15,23,42,0.9)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#fff",
  fontSize: 12,
};

export function WeatherCharts({ data }: { data: WeatherBundle }) {
  const now = new Date(data.current.time).getTime();
  const slice = data.hourly.time
    .map((t, i) => ({
      time: t,
      hour: formatTime(t, { hour: "numeric" }),
      temp: Math.round(data.hourly.temperature[i]),
      humidity: data.hourly.humidity[i],
      wind: Math.round(data.hourly.windSpeed[i]),
      rain: data.hourly.precipProb[i],
    }))
    .filter((d) => {
      const t = new Date(d.time).getTime();
      return t >= now - 3600_000 && t <= now + 23 * 3600_000;
    });

  const daily = data.daily.time.map((t, i) => ({
    day: new Date(t).toLocaleDateString([], { weekday: "short" }),
    high: Math.round(data.daily.tempMax[i]),
    low: Math.round(data.daily.tempMin[i]),
    rain: data.daily.precipProb[i] ?? 0,
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Temperature" subtitle="Next 24 hours" delay={0.05}>
        <AreaChart data={slice}>
          <defs>
            <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
          <XAxis dataKey="hour" stroke="currentColor" fontSize={11} tickLine={false} />
          <YAxis stroke="currentColor" fontSize={11} tickLine={false} unit="°" />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="temp" stroke="#3B82F6" strokeWidth={2.5} fill="url(#tempFill)" />
        </AreaChart>
      </ChartCard>

      <ChartCard title="Humidity" subtitle="Hourly" delay={0.1}>
        <AreaChart data={slice}>
          <defs>
            <linearGradient id="humFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
          <XAxis dataKey="hour" stroke="currentColor" fontSize={11} tickLine={false} />
          <YAxis stroke="currentColor" fontSize={11} tickLine={false} unit="%" domain={[0, 100]} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="humidity" stroke="#06B6D4" strokeWidth={2.5} fill="url(#humFill)" />
        </AreaChart>
      </ChartCard>

      <ChartCard title="Wind Speed" subtitle="Hourly km/h" delay={0.15}>
        <BarChart data={slice}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
          <XAxis dataKey="hour" stroke="currentColor" fontSize={11} tickLine={false} />
          <YAxis stroke="currentColor" fontSize={11} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="wind" fill="#3B82F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="7-Day Trend" subtitle="High / Low / Rain %" delay={0.2}>
        <LineChart data={daily}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
          <XAxis dataKey="day" stroke="currentColor" fontSize={11} tickLine={false} />
          <YAxis stroke="currentColor" fontSize={11} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="high" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="low" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="rain" stroke="#22C55E" strokeWidth={2} strokeDasharray="4 4" dot={false} />
        </LineChart>
      </ChartCard>
    </div>
  );
}
