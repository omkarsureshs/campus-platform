import { UserCircle2 } from "lucide-react";

function Profile({ user }) {

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (

    <div className="max-w-6xl">

      <div className="mb-10">

        <h1 className="text-5xl font-bold font-['Space_Grotesk']">
          Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account and productivity identity.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Column */}

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
            {user?.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {user?.email}
          </p>

          <div
            className="
              mt-6
              px-4
              py-2
              rounded-xl
              bg-white/5
              inline-block
            "
          >
            @{user?.nickname || "campus-user"}
          </div>

        </div>

        {/* Right Column */}

        <div className="lg:col-span-2 space-y-8">

          <div
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <h2 className="text-2xl font-semibold mb-6">
              Account Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <p className="text-gray-500 text-sm">
                  Full Name
                </p>

                <p className="mt-1 text-lg">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="mt-1 text-lg">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Nickname
                </p>

                <p className="mt-1 text-lg">
                  {user?.nickname || "Not set"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Joined
                </p>

                <p className="mt-1 text-lg">
                  {user?.created_at
                    ? new Date(
                        user.created_at
                      ).toLocaleDateString()
                    : "Recently"}
                </p>
              </div>

            </div>

          </div>

          <div
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-3xl
              p-8
            "
          >

            <h2 className="text-2xl font-semibold mb-4">
              Productivity Identity
            </h2>

            <p className="text-gray-400">
              Building a personal knowledge system through notes,
              ideas and structured learning.
            </p>

            <button
              className="
                mt-6
                px-6
                py-3
                rounded-2xl
                bg-white
                text-black
                font-semibold
              "
            >
              Edit Profile
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;