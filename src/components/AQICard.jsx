import { Wind } from "lucide-react";

function AQICard({ airQuality }) {

  if (!airQuality) return null;

  const pm =
    airQuality.current.pm2_5;

  return (
    <div
      className="
        glass
        p-6
        rounded-3xl
      "
    >
      <div className="flex items-center gap-3">
        <Wind />
        <h2 className="font-bold">
          Air Quality
        </h2>
      </div>

      <h1 className="text-4xl mt-5">
        {pm.toFixed(1)}
      </h1>

      <p className="opacity-70">
        PM2.5
      </p>
    </div>
  );
}

export default AQICard;
