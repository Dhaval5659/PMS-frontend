import type { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import Logout from "../pages/auth/Logout";
import Dashboard from "../pages/dashboard/Dashboard";
import EditProfile from "../pages/profile/EditProfile";
import ProfilePage from "../pages/profile/ProfilePage";
import AppLayout from "../components/layout/AppLayout";
import Members from "../pages/members/Members";
import MemberDetails from "../pages/members/MemberDetails";
import Organization from "../pages/organization/Organization";
import OrganizationDetails from "../pages/organization/OrganizationDetails";
import Project from "../pages/project/Project";
import ProjectDetails from "../pages/project/ProjectDetails";
import Task from "../pages/task/Task";
import TaskDetails from "../pages/task/TaskDetails";

const isAuthenticated = () => Boolean(localStorage.getItem("accessToken"));

function ProtectedRoute({ children }: { children: ReactElement }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }: { children: ReactElement }) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} replace />}
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:memberId" element={<MemberDetails />} />
        <Route path="/organizations" element={<Organization />} />
        <Route path="/organizations/:organizationId" element={<OrganizationDetails />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
