import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type {
  AuthResponse,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  LogoutPayload,
  RefreshTokenResponse,
  RegisterPayload,
  ResetPasswordPayload,
  UpdateProfilePayload,
  UserProfile,
} from "../types/auth.types";

const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, "");
const authBaseUrl = normalizedBaseUrl.endsWith("/auth")
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/auth`;

// main API object
const API = axios.create({
  baseURL: authBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Prevent infinite retry loop
type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string> | null = null;

const clearAuthStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("auth-user-updated"));
};

// Logout and redirect to login if refresh token is invalid or expired, or if any unexpected error occurs during token refresh.
const redirectToLogin = () => {
  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

/*
Get refreshToken 
   ↓
Call /refresh-token API
   ↓
Get new accessToken
   ↓
Store it and retry the original request with the new token
*/

// called when access token is expired and a 401 response is received from a protected API call
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (!refreshToken) {
    throw new Error("Refresh token is missing.");
  }

  // Use the refresh token to get a fresh access token when protected calls return 401.
  const response = await axios.post<RefreshTokenResponse>(
    `${authBaseUrl}/refresh-token`,
    { refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const newAccessToken = response.data.accessToken;
  const nextRefreshToken = response.data.refreshToken;

  localStorage.setItem("accessToken", newAccessToken);

  if (nextRefreshToken) {
    localStorage.setItem("refreshToken", nextRefreshToken);
  }

  return newAccessToken;
};

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  // Attach the latest access token to every auth API request.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;

    if (!originalRequest || status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/login") || originalRequest.url?.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Reuse the same refresh request if multiple API calls fail at once.
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const newAccessToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      // Retry the original request once after refreshing the token.
      return API(originalRequest);
    } catch (refreshError) {
      // If refresh also fails, clear the session and send the user back to login.
      clearAuthStorage();
      redirectToLogin();
      return Promise.reject(refreshError);
    }
  },
);

export const loginUser = async (data: LoginPayload) => {
  const response = await API.post<AuthResponse>("/login", data);
  return response.data;
};

export const signupUser = async (data: RegisterPayload) => {
  const response = await API.post("/register", data);
  return response.data;
};

export const changePassword = (data: ChangePasswordPayload) =>
  API.put("/change-password", data);

export const forgotPassword = (data: ForgotPasswordPayload) =>
  API.post("/forgot-password", data);

export const resetPassword = (data: ResetPasswordPayload) =>
  API.put("/reset-password", data);

export const logoutUser = (data: LogoutPayload) =>
  API.post("/logout", data);

export const getProfile = async () => {
  const response = await API.get<UserProfile>("/profile");
  return response.data;
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  const response = await API.put<UserProfile>("/profile", data);

  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...parsedUser,
          name: response.data.name,
          email: response.data.email,
        }),
      );
    } catch {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        }),
      );
    }

    window.dispatchEvent(new Event("auth-user-updated"));
  }

  return response.data;
};
