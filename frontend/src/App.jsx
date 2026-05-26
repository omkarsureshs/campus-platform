import { useEffect, useState } from "react";
import axios from "axios";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";

import AppLayout from "./components/AppLayout";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://campus-platform-hp24.onrender.com/api/profile",
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

    checkAuth();

  }, []);

  if (loading) {
    return (
      <div className="text-white bg-black min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <AppLayout setUser={setUser}>
                <Dashboard user={user} />
              </AppLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Notes */}
        <Route
          path="/notes"
          element={
            user ? (
              <AppLayout setUser={setUser}>
                <Notes />
              </AppLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;