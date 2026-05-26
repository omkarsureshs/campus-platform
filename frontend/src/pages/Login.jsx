import { useState } from "react";
import axios from "axios";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://https://campus-platform-hp24.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

localStorage.setItem("token", response.data.token);

alert("Login successful!");

      const token = response.data.token;

localStorage.setItem("token", token);

const profileResponse = await axios.get(
  "http://https://campus-platform-hp24.onrender.com/api/profile",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

console.log(profileResponse.data);
setUser(profileResponse.data.user);

alert("Protected route accessed!");
    } catch (err) {
      console.error(err);

      alert("Login failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-950">
    <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">

      <h2 className="text-5xl font-bold font-['Space_Grotesk']">
        Campus Platform
      </h2>

      <form onSubmit={handleLogin} className="space-y-5">

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 text-white border border-gray-700 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white p-4 rounded-xl font-semibold"
        >
          Login
        </button>

      </form>
    </div>
  </div>
);
}

export default Login;