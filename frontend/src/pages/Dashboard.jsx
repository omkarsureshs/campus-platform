import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import StatsCard from "../components/StatsCard";

function Dashboard({ user, setCurrentPage }) {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://campus-platform-hp24.onrender.com/api/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

    }

  };

  if (!stats) {

    return (

      <div
        className="
          h-[70vh]
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            text-gray-500
            animate-pulse
            text-xl
          "
        >
          Loading Dashboard...
        </div>

      </div>

    );

  }

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (

    <div>

      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <h1 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk']">
          {greeting}, {user?.name} 👋
        </h1>

        <p className="text-gray-500 mt-3">
          Welcome back to your workspace.
        </p>

      </motion.div>

      {/* PRODUCTIVITY HERO */}

      <motion.div /*Complete div*/
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
        className="
          mt-10
          mb-10
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          overflow-hidden
          relative
        "
      >

        <div
          className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-white/[0.02]
            blur-3xl
            rounded-full
          "
        />

        <p className="text-gray-500 mb-3">
          Productivity Snapshot
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          {stats.totalNotes}
        </h2>

        <p className="text-gray-400 mt-4">
          Notes captured in your
          personal knowledge system.
        </p>

      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatsCard
          title="Total Notes"
          value={stats.totalNotes}
          color="text-blue-400"
          subtitle="Knowledge stored"
        />

        <StatsCard
          title="Pinned Notes"
          value={stats.pinnedNotes}
          color="text-yellow-400"
          subtitle="Important notes"
        />

        <StatsCard
          title="Recent Notes"
          value={
            stats.recentNotes.length
          }
          color="text-green-400"
          subtitle="Latest activity"
        />

      </div>

      {/* RECENT NOTES */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
        "
      >

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-4xl md:text-5xl font-bold">
            Recent Activity
          </h2>

          <span className="text-sm text-gray-500">
            Latest notes
          </span>

        </div>

        {stats.recentNotes.length === 0 ? (

          <div className="text-center py-10">

            <div className="text-5xl mb-4">
              📝
            </div>

            <p className="text-gray-500">
              No notes created yet.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {stats.recentNotes.map(
              (note) => (

                <div
                  key={note.id}
                  className="
                    p-5
                    rounded-2xl
                    border
                    border-white/10
                    hover:border-white/20
                    hover:bg-white/[0.03]
                    transition-all
                  "
                >

                  <p className="font-medium text-lg">
                    {note.title}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(
                      note.created_at
                    ).toLocaleString()}
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </motion.div>

    </div>

  );

}

export default Dashboard;