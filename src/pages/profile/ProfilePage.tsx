import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/authService";
import type { UserProfile } from "../../types/auth.types";
 
export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const data = await getProfile();

        if (mounted) {
          setProfile(data);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err?.response?.data?.error ?? err?.message ?? "Failed to load profile.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            View the account details.
          </p>
        </div>
        <Link
          to="/edit-profile"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Edit Profile
        </Link>
      </div>

      {loading ? <p className="mt-6 text-sm text-gray-500">Loading profile...</p> : null}

      {error ? (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {profile ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Name</p>
            <p className="mt-2 text-base text-gray-900">{profile.name}</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Email</p>
            <p className="mt-2 text-base text-gray-900">{profile.email}</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Member Since</p>
            <p className="mt-2 text-base text-gray-900">
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleString()
                : "Not available"}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
