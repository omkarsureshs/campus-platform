import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Profile({ user }) {

  const [name, setName] =
    useState(user?.name || "");

  const [nickname, setNickname] =
    useState(user?.nickname || "");

  const [saving, setSaving] =
    useState(false);

  const initials =
    name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const saveProfile = async () => {

    try {

      setSaving(true);

      const token =
        localStorage.getItem("token");

      const response =
        await axios.put(
          "https://campus-platform-hp24.onrender.com/api/profile",
          {
            name,
            nickname,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      toast.success(
        "Profile updated successfully"
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to update profile"
      );

    } finally {

      setSaving(false);

    }

  };

  return (

    <div className="max-w-6xl">

      <div className="mb-10">

        <h1 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk']">
          Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your identity.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div
          className="
            bg-white/[0.03]
            border
            border-white/10
            rounded-3xl
            p-8
          "
        >

          <div
            className="
              h-28
              w-28
              rounded-full
              bg-white/10
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              mb-6
            "
          >
            {initials}
          </div>

          <h2 className="text-3xl font-bold">
            {name}
          </h2>

          <p className="text-gray-500 mt-2">
            {user?.email}
          </p>

        </div>

        <div className="lg:col-span-2">

          <div
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <h2 className="text-2xl font-semibold mb-8">
              Edit Profile
            </h2>

            <div className="space-y-6">

              <div>

                <label className="block text-sm text-gray-500 mb-2">
                  Full Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
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

              </div>

              <div>

                <label className="block text-sm text-gray-500 mb-2">
                  Nickname
                </label>

                <input
                  value={nickname}
                  onChange={(e) =>
                    setNickname(e.target.value)
                  }
                  placeholder="@nickname"
                  className="
                    w-full
                    p-4
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                  "
                />

              </div>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="
                  px-6
                  py-3
                  rounded-2xl
                  bg-white
                  text-black
                  font-semibold
                "
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;