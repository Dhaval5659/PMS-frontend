import type { AuthFormConfig, AuthType } from "../types/auth.types";

export const formConfig: Record<AuthType, AuthFormConfig> = {
  login: {
    title: "Login",
    submitLabel: "Login",
    fields: [
      { name: "email", type: "email", placeholder: "Email" },
      { name: "password", type: "password", placeholder: "Password" },
    ],
    links: [
      { label: "Forgot Password?", to: "/forgot-password", variant: "text" },
      { label: "Sign Up", to: "/signup", variant: "secondary" },
    ],
  },
  signup: {
    title: "Sign Up",
    submitLabel: "Create Account",
    fields: [
      { name: "name", type: "text", placeholder: "Full Name" },
      { name: "email", type: "email", placeholder: "Email" },
      { name: "phone", type: "text", placeholder: "Phone Number" },
      { name: "password", type: "password", placeholder: "Password" },
    ],
    links: [{ label: "Back to Login", to: "/login", variant: "secondary" }],
  },
  ChangePassword: {
    title: "Change Password",
    submitLabel: "Change Password",
    fields: [
      { name: "currentPassword", type: "password", placeholder: "Current Password" },
      { name: "newPassword", type: "password", placeholder: "New Password" },
    ],
    links: [{ label: "Back to Dashboard", to: "/dashboard", variant: "secondary" }],
  },
  forgot: {
    title: "Forgot Password",
    submitLabel: "Send Reset Link",
    fields: [{ name: "email", type: "email", placeholder: "Email" }],
    links: [{ label: "Back to Login", to: "/login", variant: "secondary" }],
  },
  reset: {
    title: "Reset Password",
    submitLabel: "Reset Password",
    fields: [{ name: "newPassword", type: "password", placeholder: "New Password" }],
    links: [{ label: "Back to Login", to: "/login", variant: "secondary" }],
  },
};
