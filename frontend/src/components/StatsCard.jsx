import { motion } from "framer-motion";

function StatsCard({
  title,
  value,
  color,
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-6
        hover:border-white/20
        hover:bg-white/[0.05]
        transition-all
        duration-300
      "
    >
      <div
        className="
          absolute
          top-0
          right-0
          w-32
          h-32
          rounded-full
          bg-white/[0.02]
          blur-3xl
        "
      />

      <p className="text-sm text-gray-500 mb-3">
        {title}
      </p>

      <h2
        className={`text-4xl md:text-5xl font-bold ${color}`}
      >
        {value}
      </h2>

      {subtitle && (
        <p className="text-gray-500 text-sm mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default StatsCard;