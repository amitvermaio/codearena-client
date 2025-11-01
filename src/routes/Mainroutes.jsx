import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts & Wrappers
import MainLayout from "@/components/layout/MainLayout";
import SettingsLayout from "@/components/layout/SettingsLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminRoute from "../components/AdminRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthWrapper from "@/components/auth/AuthWrapper";


const Loader = () => <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;

// Lazy imports
import Home from "@/pages/Home";
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const AdminPanel = lazy(() => import("../pages/admin/AdminPanel"));
const ProblemList = lazy(() => import("../pages/problems/ProblemPage"));
const ProblemDetails = lazy(() => import("../pages/problems/ProblemDetails"));
const UserProfile = lazy(() => import("../pages/profile/UserProfile"));
const ContestList = lazy(() => import("../pages/contests/ContestList"));
const ContestProblems = lazy(() => import("../pages/contests/ContestProblems"));
const ProblemOfTheDay = lazy(() => import("../pages/potd/ProblemOfTheDay"));
const IDE = lazy(() => import("../pages/tools/IDE"));
const CodeConverter = lazy(() => import("../pages/tools/CodeConverter"));
const NotFound = lazy(() => import("../pages/NotFound"));
const VerifyEmail = lazy(() => import("../pages/auth/VerifyEmail"));
const Summarizer = lazy(() => import("../pages/tools/Summarizer"));
const Tools = lazy(() => import("../pages/tools/Tools"));
const UserSettings = lazy(() => import("../pages/problems/UserAccount"));
const ProfileSettings = lazy(() => import("../pages/settings/ProfileSettings"));
const SecuritySettings = lazy(() => import("../pages/settings/SecuritySettings"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const ProblemManagement = lazy(() => import("@/pages/admin/ProblemManagement"));
const ContestManagement = lazy(() => import("@/pages/admin/ContestManagement"));
const ContestCreate = lazy(() => import("@/pages/admin/ContestCreate"));

const Mainroutes = () => {
  return (
    <Suspense fallback={<Loader />}>
        <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/verify-account" element={<VerifyEmail />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

        {/* Problems */}
        <Route path="/problems/:problemId" element={<ProblemDetails />} />

        {/* Contests */}
        <Route path="/contests/:contestId" element={<ContestProblems />} />

        {/* Problem of the Day */}
        <Route path="/potd" element={<ProblemOfTheDay />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/administration"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPanel />} />
          <Route path="users-management" element={<UserManagement />} />
          <Route path="problems-management" element={<ProblemManagement />} />
          <Route path="contests-management" element={<ContestManagement />} />
          <Route path="contests-management/create-contest" element={<ContestCreate />} />
        </Route>

        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/contests" element={<ContestList />} />
          <Route path="/tools" element={<Tools />} />

          {/* Tools */}
          <Route path="/tools/ide" element={<IDE />} />
          <Route path="/tools/code-converter" element={<CodeConverter />} />
          <Route path="/tools/summarizer" element={<Summarizer />} />

          {/* Profile */}
          <Route path="/u/:username" element={<UserProfile />} />

          {/* Settings */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<ProfileSettings />} />
            <Route path="account" element={<UserSettings />} />
            <Route path="security" element={<SecuritySettings />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
};

export default Mainroutes;
