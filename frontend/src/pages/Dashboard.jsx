import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import StatsCard from "../components/StatsCard";

function Dashboard({ user }) {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://campus-platform-hp24.onrender.com/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  if (!stats) {
    return <p>Loading Dashboard...</p>;
  }

  return (
    <div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >

        <h1 className="text-5xl font-bold font-['Space_Grotesk']">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="text-gray-400 mt-2 mb-10">
          Logged in as {user?.name}
        </p>

      </motion.div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <StatsCard
          title="Total Notes"
          value={stats.totalNotes}
          color="text-blue-500"
        />

        <StatsCard
          title="Pinned Notes"
          value={stats.pinnedNotes}
          color="text-yellow-500"
        />

        <StatsCard
          title="Tags"
          value={stats.totalTags}
          color="text-green-500"
        />

        <StatsCard
          title="Latest Note"
          value={stats.latestNote}
          color="text-purple-500"
        />

      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Recent Notes
        </h2>

        <div className="space-y-4">

          {stats.recentNotes.map((note) => (

            <div
              key={note.id}
              className="
                border border-white/10
                rounded-2xl
                p-4
                hover:bg-white/[0.03]
                transition
              "
            >
              <p className="font-medium">
                {note.title}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(
                  note.created_at
                ).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;