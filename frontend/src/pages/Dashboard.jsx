import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";

function Dashboard({ user, setUser }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      <Sidebar setUser={setUser} />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-3">
          Welcome back 👋
        </h1>

        <p className="text-gray-400 mb-10">
          Logged in as {user?.email}
        </p>

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