import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncgetpotd } from "@/store/actions/problems/potdAction";

// Layouts
import MainLayout from "@/components/layout/MainLayout";
import SettingsLayout from "@/components/layout/SettingsLayout";
import AdminLayout from "@/components/layout/AdminLayout";

// Route Guards (Auth + Admin)
import AdminRoute from "@/components/AdminRoute";
import ProtectedRoute from "@/components/ProtectedRoute";

// Loader Component
const Loader = () => (
  <div className="flex items-center justify-center h-screen text-lg">
    Loading...
  </div>
);

// Lazy-loaded Pages
import Home from "@/pages/Home";
import OAuthSuccess from "@/components/auth/OAuthSuccess";
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));

const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));

// Problems
const ProblemList = lazy(() => import("@/pages/problems/ProblemPage"));
const ProblemDetails = lazy(() => import("@/pages/problems/ProblemDetails"));
const UserSettings = lazy(() => import("@/pages/problems/UserAccount"));

// Profile
const UserProfile = lazy(() => import("@/pages/profile/UserProfile"));

// Contests
const ContestList = lazy(() => import("@/pages/contests/ContestList"));
const ContestDetails = lazy(() => import("@/pages/contests/ContestDetailsPage"));

// POTD
const PotdPage = lazy(() => import("@/pages/potd/PotdPage"));

// Tools
const Tools = lazy(() => import("@/pages/tools/Tools"));
const IDE = lazy(() => import("@/pages/tools/IDE"));
const CodeConverter = lazy(() => import("@/pages/tools/CodeConverter"));
const Summarizer = lazy(() => import("@/pages/tools/Summarizer"));

// Admin Pages
const AdminPanel = lazy(() => import("@/pages/admin/AdminPanel"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const ProblemManagement = lazy(() => import("@/pages/admin/ProblemManagement"));
const ContestManagement = lazy(() => import("@/pages/admin/ContestManagement"));
const ContestCreate = lazy(() => import("@/pages/admin/ContestCreate"));

// Misc
const NotFound = lazy(() => import("@/pages/NotFound"));
const ProfileSettings = lazy(() => import("@/pages/settings/ProfileSettings"));
const SecuritySettings = lazy(() => import("@/pages/settings/SecuritySettings"));



// ------------------------------------------------------
// Main Application Routes
// ------------------------------------------------------
const Mainroutes = () => {

  const dispatch = useDispatch();
  const { loaded, potd } = useSelector((state) => state.potd);

  useEffect(() => {
    if (!loaded) {
      dispatch(asyncgetpotd());
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>

        {/* ------------------------------ */}
        {/* Public Routes                 */}
        {/* ------------------------------ */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/verify-account" element={<VerifyEmail />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Single Problem Page */}
        <Route path="/problems/:problemId" element={<ProblemDetails />} />

        {/* Single Contest Problems */}
        <Route path="/contests/:contestId" element={<ContestDetails />} />

        {/* POTD */}
        <Route path="/potd" element={<PotdPage />} />



        {/* ------------------------------ */}
        {/* Protected Dashboard            */}
        {/* ------------------------------ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />



        {/* ------------------------------ */}
        {/* Admin Routes (Protected + Admin) */}
        {/* ------------------------------ */}
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
          {/* Admin Home */}
          <Route index element={<AdminPanel />} />

          {/* Admin Sub-pages */}
          <Route path="users-management" element={<UserManagement />} />
          <Route path="problems-management" element={<ProblemManagement />} />
          <Route path="contests-management" element={<ContestManagement />} />
          <Route
            path="contests-management/create-contest"
            element={<ContestCreate />}
          />
        </Route>



        {/* ------------------------------ */}
        {/* Main Layout Wrapper            */}
        {/* ------------------------------ */}
        <Route element={<MainLayout />}>

          {/* Problems Page */}
          <Route path="/problems" element={<ProblemList />} />

          {/* Contest List */}
          <Route path="/contests" element={<ContestList />} />

          {/* Tools Hub */}
          <Route path="/tools" element={<Tools />} />

          {/* Individual Tools */}
          <Route path="/tools/ide" element={<IDE />} />
          <Route path="/tools/code-converter" element={<CodeConverter />} />
          <Route path="/tools/summarizer" element={<Summarizer />} />

          {/* User Profile */}
          <Route path="/u/:username" element={<UserProfile />} />

          {/* Settings Section */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<ProfileSettings />} />
            <Route path="account" element={<UserSettings />} />
            <Route path="security" element={<SecuritySettings />} />
          </Route>

        </Route>



        {/* ------------------------------ */}
        {/* 404 Not Found                  */}
        {/* ------------------------------ */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
};

export default Mainroutes;
