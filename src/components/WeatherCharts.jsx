import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

function WeatherCharts({ weather }) {

  if (!weather) return null;

  const hourlyData =
    weather.hourly.time
      .slice(0, 24)
      .map((time, index) => ({
        time: new Date(time)
          .toLocaleTimeString([], {
            hour: "2-digit"
          }),

        temp:
          weather.hourly
            .temperature_2m[index],

        humidity:
          weather.hourly
            .relative_humidity_2m[index],

        wind:
          weather.hourly
            .wind_speed_10m[index]
      }));

  const forecastData =
    weather.daily.time.map(
      (day, index) => ({
        day: new Date(day)
          .toLocaleDateString(
            "en-US",
            {
              weekday: "short"
            }
          ),

        max:
          weather.daily
            .temperature_2m_max[index],

        min:
          weather.daily
            .temperature_2m_min[index],

        rain:
          weather.daily
            .precipitation_probability_max[
            index
          ]
      })
    );

  return (
    <div className="space-y-8">

      {/* Temperature */}

      <div className="glass rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Temperature Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart data={hourlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Humidity */}

      <div className="glass rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Humidity Levels
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <AreaChart data={hourlyData}>

            <defs>
              <linearGradient
                id="humidity"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#06B6D4"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#06B6D4"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="humidity"
              stroke="#06B6D4"
              fill="url(#humidity)"
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

      {/* Wind */}

      <div className="glass rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Wind Speed
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={hourlyData}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="wind"
              fill="#F59E0B"
              radius={[6,6,0,0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Forecast */}

      <div className="glass rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          7-Day Forecast Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart data={forecastData}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="max"
              stroke="#EF4444"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="min"
              stroke="#3B82F6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default WeatherCharts;
