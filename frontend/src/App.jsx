import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

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

    checkAuth();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {user ? (
        <Dashboard user={user} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;