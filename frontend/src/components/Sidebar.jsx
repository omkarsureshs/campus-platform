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
  sidebarOpen,
  setSidebarOpen,
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
  {
    label: "Profile",
    path: "/profile",
    icon: UserCircle2,
  },
];

  return (

    <aside
  className={`
    fixed
    md:static
    top-0
    left-0
    z-50

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

    transition-transform
    duration-300

    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full md:translate-x-0"
    }
  `}
>

      <div>

        {/* Branding */}

<div className="mb-10">

  <div className="flex items-center gap-4">

    <div
      className="
        h-14
        w-14
        rounded-2xl
        bg-white/[0.04]
        border
        border-white/10
        flex
        items-center
        justify-center
        text-2xl
      "
    >
      🧠
    </div>

    <div>

      <h1
        className="
          text-3xl
          font-bold
          font-['Space_Grotesk']
        "
      >
        Campus
      </h1>

      <p className="text-gray-500 text-sm">
        Personal Knowledge OS
      </p>

    </div>

  </div>

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

          <div
  className="
    h-14
    w-14
    rounded-full
    bg-white/10
    flex
    items-center
    justify-center
    text-lg
    font-bold
    mb-3
  "
>
  {user?.name?.charAt(0)?.toUpperCase()}
</div>

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
  onClick={() =>
    setSidebarOpen(false)
  }
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
  ? "bg-white text-black shadow-lg"
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

        {/* Workspace Card */}

<div
  className="
    mt-10
    bg-white/[0.03]
    border
    border-white/10
    rounded-3xl
    p-5
  "
>

  <p className="text-gray-500 text-sm mb-2">
    Workspace Status
  </p>

  <h3 className="text-xl font-semibold">
    Keep Learning
  </h3>

  <p className="text-gray-500 text-sm mt-2">
    Capture ideas. Build knowledge.
  </p>

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