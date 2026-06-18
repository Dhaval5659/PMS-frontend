import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { StoredUser } from "../../types/auth.types";
import profileImage from "../../assets/profile.png";


function getStoredUser(): StoredUser | null {
  const rawUser = localStorage.getItem("user");

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as StoredUser;
  } catch {
    return null;
  }
}

export default function Profile() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<StoredUser | null>(() => getStoredUser());

  useEffect(() => {
    const syncUser = () => {
      setUser(getStoredUser());
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("auth-user-updated", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth-user-updated", syncUser);
    };
  }, []);

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full bg-gray-100 p-1">
        <img
          src={profileImage}
          alt="Profile"
          className="h-10 w-10 cursor-pointer rounded-full"
        />
      </button>

      {open ? (
        <div className="absolute right-0 top-14 z-20 w-auto min-w-[200px] max-w-xs rounded-lg border bg-white shadow-lg">
          <div className="border-b p-3">
            <p className="font-medium">
              {user?.name ?? "Guest User"}
              </p>
            <p className="text-sm break-all text-gray-500">
              {user?.email ?? "No email available"}
            </p>
          </div>

          <ul className="py-2">
            <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
              <button
                type="button"
                onClick={() => handleNavigate("/profile")}
                className="w-full text-left">
                Profile
              </button>
            </li>
            <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
              <button
                type="button"
                onClick={() => handleNavigate("/edit-profile")}>
                Update Profile
              </button>
            </li>
            <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
              <button
                type="button"
                onClick={() => handleNavigate("/change-password")}
                className="w-full text-left">
                Change Password
              </button>
            </li>
            <li className="cursor-pointer px-4 py-2 hover:bg-red-100 text-red-600">
              <button
                type="button"
                onClick={() => handleNavigate("/logout")}
                className="w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
