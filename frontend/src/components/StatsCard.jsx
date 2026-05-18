import { motion } from "framer-motion";

function StatsCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        bg-white/5
        backdrop-blur-lg
        border border-white/10
        p-6
        rounded-3xl
        shadow-2xl
      "
    >
      <h2 className="text-lg text-gray-400 mb-2">
        {title}
      </h2>

      <p className={`text-5xl font-bold ${color}`}>
        {value}
      </p>
    </motion.div>
  );
}

export default StatsCard;