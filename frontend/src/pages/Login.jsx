import { useState } from "react";
import axios from "axios";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
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
  "http://localhost:5000/api/profile",
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
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;