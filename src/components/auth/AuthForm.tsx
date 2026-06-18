import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { formConfig } from "../../config/authFormConfig";
import type { AuthType } from "../../types/auth.types";
import AuthInput from "./AuthInput";
import AuthWrapper from "./AuthWrapper";
import {
  forgotPassword,
  loginUser,
  resetPassword,
  signupUser,
  changePassword,
} from "../../services/authService";

export default function AuthForm({ type }: { type: AuthType }) {
  const config = formConfig[type];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      if (type === "login") {
        const result = await loginUser({
          email: formData.email ?? "",
          password: formData.password ?? "",
        });

        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        localStorage.setItem("user", JSON.stringify(result.user));
        window.dispatchEvent(new Event("auth-user-updated"));
        setMessage("Login successful.");
        setTimeout(() => navigate("/dashboard"), 300);
      }

      if (type === "signup") {
        const result = await signupUser({
          name: formData.name ?? "",
          email: formData.email ?? "",
          phone: formData.phone ?? "",
          password: formData.password ?? "",
        });

        setMessage(
          result.message ?? "Registration successful. Please verify your email to login.",
        );
        setTimeout(() => navigate("/login"), 1200);
      }

      if (type === "ChangePassword") {
        const result = await changePassword({
          currentPassword: formData.currentPassword ?? "",
          newPassword: formData.newPassword ?? "",
        });

        setMessage(result.data?.message ?? "Password changed successfully.");
        setTimeout(() => navigate("/login"), 1200);
      }

      if (type === "forgot") {
        const result = await forgotPassword({
          email: formData.email ?? "",
        });

        setMessage(
          result.data?.message ?? "If the email exists, a password reset link has been sent.",
        );
      }

      if (type === "reset") {
        const token = searchParams.get("token");

        if (!token) {
          throw new Error("Reset token is missing in the URL.");
        }

        const result = await resetPassword({
          token,
          newPassword: formData.newPassword ?? "",
        });

        setMessage(result.data?.message ?? "Password reset successfully.");
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch (err: any) {
      setError(err?.response?.data?.error ?? err?.message ?? "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <form onSubmit={handleSubmit} className="w-96 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">{config.title}</h2>

        {config.fields.map((field) => (
          <AuthInput
            key={field.name}
            field={field}
            value={formData[field.name] ?? ""}
            onChange={handleChange}
          />
        ))}

        {message ? (
          <p className="mb-3 rounded bg-green-50 px-3 py-2 text-sm text-green-700">
            {message}
          </p>
        ) : null}

        {error ? (
          <p className="mb-3 rounded bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-60"
        >
          {loading ? "Please wait..." : config.submitLabel}
        </button>

        {config.links?.length ? (
          <div className="mt-4 flex flex-col gap-2">
            {config.links.map((link) => (
              <Link
                key={`${type}-${link.to}-${link.label}`}
                to={link.to}
                className={
                  link.variant === "text"
                    ? "text-center text-sm text-blue-600 hover:underline"
                    : "w-full rounded border border-blue-500 px-4 py-2 text-center text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                }>
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </form>
    </AuthWrapper>
  );
}
