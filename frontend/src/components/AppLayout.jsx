import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

function AppLayout({
  children,
  setUser,
  user,
}) {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (

    <div className="min-h-screen bg-black text-white">

      {/* Mobile Header */}

      <div
        className="
          md:hidden
          flex
          items-center
          justify-between
          px-5
          py-4
          border-b
          border-white/10
        "
      >

        <h1 className="font-bold text-xl">
          Campus
        </h1>

        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        >
          <Menu />
        </button>

      </div>

      <div className="flex">

        <Sidebar
          setUser={setUser}
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main
          className="
            flex-1
            p-5
            md:p-10
            overflow-y-auto
          "
        >
          {children}
        </main>

      </div>

    </div>

  );

}

export default AppLayout;