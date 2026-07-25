import { formatDate }
from "../utils/helpers";

function ForecastCard({
  day,
  max,
  min,
  rain
}) {
  return (
    <div
      className="
        glass
        rounded-2xl
        p-4
      "
    >
      <h3 className="font-semibold">
        {formatDate(day)}
      </h3>

      <div className="text-3xl mt-4">
        ⛅
      </div>

      <div className="mt-4">
        <span className="font-bold">
          {Math.round(max)}°
        </span>

        <span className="ml-2 opacity-60">
          {Math.round(min)}°
        </span>
      </div>

      <p className="text-sm mt-2">
        Rain: {rain}%
      </p>
    </div>
  );
}

export default ForecastCard;
