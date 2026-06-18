import type { ReactNode } from "react";

export type AuthType = "login" | "signup" | "forgot" | "reset" | "ChangePassword";

export interface FieldConfig {
  name: string;
  type: string;
  placeholder: string;
}

export interface AuthLinkConfig {
  label: string;
  to: string;
  variant?: "primary" | "secondary" | "text";
}

export interface AuthFormConfig {
  title: string;
  submitLabel: string;
  fields: FieldConfig[];
  links?: AuthLinkConfig[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface LogoutPayload {
  refreshToken: string;
  userId: string | number;
}

export interface UserProfile {
  id: string | number;
  name: string;
  email: string;
  createdAt?: string;
}

export interface UpdateProfilePayload {
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string | number;
    name: string;
    email: string;
    phone?: string;
    emailVerified?: boolean;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthWrapperProps {
  title: string;
  subtitle: string;
  sideTitle: string;
  sideDescription: string;
  heroImage?: string;
  children: ReactNode;
}

export interface StoredUser {
  name?: string;
  email?: string;
}

export type ButtonProps = {
  image: string;
  label: string;
  to: string;
};

