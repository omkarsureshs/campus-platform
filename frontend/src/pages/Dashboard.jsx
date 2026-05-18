import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import { motion } from "framer-motion";

function Dashboard({ user, setUser }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white flex">

      <Sidebar setUser={setUser} />

      <div className="flex-1 p-10">

        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

  <h1 className="text-5xl font-bold font-['Space_Grotesk']">
    Welcome back 👋
  </h1>

  <p className="text-gray-400 mb-10">
    Logged in as {user?.email}
  </p>

</motion.div>

        <div className="grid grid-cols-3 gap-6">

          <StatsCard
            title="Total Notes"
            value="12"
            color="text-blue-500"
          />

          <StatsCard
            title="Events"
            value="4"
            color="text-green-500"
          />

          <StatsCard
            title="Active Users"
            value="23"
            color="text-purple-500"
          />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;