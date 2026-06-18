import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/authService";

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const data = await getProfile();

        if (mounted) {
          setName(data.name);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await updateProfile({ name });
      setMessage("Profile updated successfully.");
      setTimeout(() => navigate("/profile"), 800);
    } catch (err: any) {
      setError(err?.response?.data?.error ?? err?.message ?? "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Update Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            Change your profile details and save them to the backend.
          </p>
        </div>
        <Link
          to="/profile"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </Link>
      </div>

      {loading ? <p className="mt-6 text-sm text-gray-500">Loading profile...</p> : null}

      {!loading ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </label>

          {message ? (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>
          ) : null}

          {error ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      ) : null}
    </section>
  );
}
