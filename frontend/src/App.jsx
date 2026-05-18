import { useEffect, useState } from "react";
import axios from "axios";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";

function App() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    checkAuth();

  }, []);

  const checkAuth = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);

    } catch (error) {

      console.error(error);

      localStorage.removeItem("token");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <Routes>

      <Route
        path="/"
        element={
          user
            ? <Navigate to="/dashboard" />
            : <Login setUser={setUser} />
        }
      />

      <Route
        path="/dashboard"
        element={
          user
            ? <Dashboard user={user} setUser={setUser} />
            : <Navigate to="/" />
        }
      />

      <Route
        path="/notes"
        element={
          user
            ? <Notes />
            : <Navigate to="/" />
        }
      />

    </Routes>
  );
}

export default App;