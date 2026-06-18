import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

export default function Logout() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Signing you out...");

  useEffect(() => {
    const runLogout = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      try {
        // Notify the backend so the stored refresh token can be invalidated there too.
        if (refreshToken && user?.id !== undefined) {
          await logoutUser({
            refreshToken,
            userId: user.id,
          });
        }
      } catch {
        setMessage("Your session was cleared locally.");
      } finally {
        // Always clear local auth state, even if the logout API call fails.
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth-user-updated"));
        setTimeout(() => navigate("/login", { replace: true }), 500);
      }
    };

    void runLogout();
  }, [navigate]);

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Logout</h1>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </section>
  );
}
