import CountUp from "react-countup";
import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  unit,
  icon
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="
        glass
        rounded-3xl
        p-5
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="opacity-70">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            <CountUp
              end={value || 0}
              duration={2}
            />
            {unit}
          </h2>
        </div>

        {icon}
      </div>
    </motion.div>
  );
}

export default StatCard;
