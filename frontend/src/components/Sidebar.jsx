import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  NotebookPen,
  LogOut,
  Settings,
  UserCircle2,
} from "lucide-react";

function Sidebar({
  setUser,
  user,
}) {

  const location = useLocation();

  const handleLogout = () => {

    localStorage.removeItem("token");
    setUser(null);

  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Notes",
      path: "/notes",
      icon: NotebookPen,
    },
  ];

  return (

    <aside
      className="
        w-72
        min-h-screen
        bg-black
        border-r
        border-white/10
        flex
        flex-col
        justify-between
        px-6
        py-8
      "
    >

      <div>

        {/* Branding */}

        <div className="mb-10">

          <h1
            className="
              text-3xl
              font-bold
              font-['Space_Grotesk']
            "
          >
            Campus
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Personal Knowledge OS
          </p>

        </div>

        {/* User Card */}

        <div
          className="
            mb-10
            bg-white/[0.03]
            border
            border-white/10
            rounded-3xl
            p-5
          "
        >

          <UserCircle2
            size={42}
            className="mb-3 text-white"
          />

          <h3 className="font-semibold">
            {user?.name}
          </h3>

          <p className="text-gray-500 text-sm">
            {user?.email}
          </p>

        </div>

        {/* Navigation */}

        <nav className="space-y-3">

          {navItems.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (

              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  transition-all
                  duration-300

                  ${
                    active
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >

                <Icon size={18} />

                {item.label}

              </Link>

            );

          })}

        </nav>

        {/* Productivity Card */}

        <div
          className="
            mt-10
            bg-gradient-to-br
            from-white/5
            to-white/[0.02]
            border
            border-white/10
            rounded-3xl
            p-5
          "
        >

          <p className="text-gray-500 text-sm mb-2">
            Daily Focus
          </p>

          <h3 className="text-xl font-semibold">
            Build your second brain.
          </h3>

        </div>

      </div>

      {/* Bottom */}

      <div className="space-y-3">

        <button
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-2xl
            text-gray-400
            hover:text-white
            hover:bg-white/5
            transition
          "
        >
          <Settings size={18} />
          Settings
        </button>

        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-2xl
            text-red-400
            hover:bg-red-500/10
            transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>

  );

}

export default Sidebar;