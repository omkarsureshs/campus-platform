function Sidebar({ setUser }) {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 p-6">

     <h1 className="text-5xl font-bold font-['Space_Grotesk']">
        Campus Platform
      </h1>

      <div className="space-y-4">

        <button className="w-full text-left bg-blue-600 p-3 rounded-xl">
          Dashboard
        </button>

        <button className="w-full text-left hover:bg-gray-800 p-3 rounded-xl transition">
          Notes
        </button>

        <button className="w-full text-left hover:bg-gray-800 p-3 rounded-xl transition">
          Events
        </button>

      </div>

      <button
        onClick={handleLogout}
        className="mt-10 w-full bg-red-600 hover:bg-red-700 p-3 rounded-xl transition"
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;