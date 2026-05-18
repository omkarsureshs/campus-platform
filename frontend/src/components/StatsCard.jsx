function StatsCard({ title, value, color }) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

      <h2 className="text-xl font-semibold mb-2">
        {title}
      </h2>

      <p className={`text-5xl font-bold ${color}`}>
        {value}
      </p>

    </div>
  );
}

export default StatsCard;