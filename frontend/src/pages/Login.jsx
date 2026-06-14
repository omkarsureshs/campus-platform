import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isRegister, setIsRegister] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const completedChecks =
    Object.values(passwordChecks)
      .filter(Boolean)
      .length;

  const passwordStrength =
    completedChecks <= 2
      ? "Weak"
      : completedChecks <= 4
      ? "Medium"
      : "Strong";

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isRegister) {

        if (password !== confirmPassword) {

          toast.error(
            "Passwords do not match"
          );

          return;
        }

        const validPassword =
          passwordChecks.length &&
          passwordChecks.uppercase &&
          passwordChecks.lowercase &&
          passwordChecks.number &&
          passwordChecks.special;

        if (!validPassword) {

          toast.error(
            "Password requirements not met"
          );

          return;
        }
      }

      const endpoint = isRegister
        ? "/api/auth/register"
        : "/api/auth/login";

      const response = await axios.post(
        `https://campus-platform-hp24.onrender.com${endpoint}`,
        {
          name,
          email,
          password,
        }
      );

      if (isRegister) {

        toast.success(
          "Account created successfully!"
        );

        setIsRegister(false);

        setPassword("");
        setConfirmPassword("");

        return;
      }

      const token =
        response.data.token;

      localStorage.setItem(
        "token",
        token
      );

      const profileResponse =
        await axios.get(
          "https://campus-platform-hp24.onrender.com/api/profile",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setUser(
        profileResponse.data.user
      );

      toast.success(
        "Welcome back!"
      );

    } catch (err) {

      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 border-r border-white/10">

        <h1 className="text-7xl font-bold font-['Space_Grotesk'] leading-tight">
          Campus
        </h1>

        <p className="text-xl text-gray-400 mt-6">
          Build your second brain.
        </p>

        <div className="mt-12 space-y-6">

          <div>
            🧠 Smart Notes & Markdown
          </div>

          <div>
            📌 Pin & Organize Ideas
          </div>

          <div>
            🔍 Powerful Search
          </div>

          <div>
            ☁️ Cloud Sync
          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center px-6">

        <div
          className="
          w-full
          max-w-md
          bg-white/[0.03]
          border
          border-white/10
          rounded-3xl
          p-10
          backdrop-blur-xl
        "
        >

          <h2 className="text-4xl font-bold mb-2">

            {isRegister
              ? "Create Account"
              : "Welcome Back"}

          </h2>

          <p className="text-gray-500 mb-8">

            {isRegister
              ? "Start your productivity journey"
              : "Sign in to continue"}

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {isRegister && (

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="
                w-full
                p-4
                rounded-2xl
                bg-black
                border
                border-white/10
              "
              />

            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
              w-full
              p-4
              rounded-2xl
              bg-black
              border
              border-white/10
            "
            />

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                w-full
                p-4
                rounded-2xl
                bg-black
                border
                border-white/10
              "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            {isRegister && (

              <>
                <div className="space-y-2 text-sm">

                  <p className={
                    passwordChecks.length
                      ? "text-green-400"
                      : "text-gray-500"
                  }>
                    ✓ 8 characters
                  </p>

                  <p className={
                    passwordChecks.uppercase
                      ? "text-green-400"
                      : "text-gray-500"
                  }>
                    ✓ Uppercase
                  </p>

                  <p className={
                    passwordChecks.lowercase
                      ? "text-green-400"
                      : "text-gray-500"
                  }>
                    ✓ Lowercase
                  </p>

                  <p className={
                    passwordChecks.number
                      ? "text-green-400"
                      : "text-gray-500"
                  }>
                    ✓ Number
                  </p>

                  <p className={
                    passwordChecks.special
                      ? "text-green-400"
                      : "text-gray-500"
                  }>
                    ✓ Special Character
                  </p>

                </div>

                <div>

                  <div className="h-2 bg-gray-800 rounded-full">

                    <div
                      className={`
                      h-2 rounded-full transition-all
                      ${
                        passwordStrength === "Weak"
                          ? "bg-red-500 w-1/3"
                          : passwordStrength === "Medium"
                          ? "bg-yellow-500 w-2/3"
                          : "bg-green-500 w-full"
                      }
                    `}
                    />

                  </div>

                  <p className="text-sm mt-2 text-gray-400">
                    Strength:
                    {" "}
                    {passwordStrength}
                  </p>

                </div>

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-black
                  border
                  border-white/10
                "
                />
              </>
            )}

            <button
              type="submit"
              className="
              w-full
              bg-white
              text-black
              p-4
              rounded-2xl
              font-semibold
              hover:scale-[1.02]
              transition
            "
            >
              {isRegister
                ? "Create Account"
                : "Sign In"}
            </button>

          </form>

          <div className="text-center mt-6">

            <button
              onClick={() =>
                setIsRegister(
                  !isRegister
                )
              }
              className="
              text-gray-400
              hover:text-white
            "
            >

              {isRegister
                ? "Already have an account?"
                : "Create a new account"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;