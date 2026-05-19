import { Link, useLocation } from "react-router-dom";

function Sidebar({ setUser }) {

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const navItem =
    "block w-full px-4 py-3 rounded-xl transition text-sm font-medium";

  const active =
    "bg-white text-black";

  const inactive =
    "text-gray-400 hover:text-white hover:bg-white/5";

  return (

    <div className="w-64 min-h-screen bg-black border-r border-white/10 px-6 py-8 flex flex-col justify-between">

      <div>

        {/* Branding */}
        <div className="mb-12">

          <h1 className="text-2xl font-semibold tracking-tight font-['Space_Grotesk']">
            Campus
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Student productivity platform
          </p>

        </div>

        {/* Navigation */}
        <nav className="space-y-2">

          <Link
            to="/dashboard"
            className={`${navItem} ${
              location.pathname === "/dashboard"
                ? active
                : inactive
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/notes"
            className={`${navItem} ${
              location.pathname === "/notes"
                ? active
                : inactive
            }`}
          >
            Notes
          </Link>

        </nav>

      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          text-sm
          text-gray-500
          hover:text-red-400
          transition
          text-left
          px-4
        "
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;