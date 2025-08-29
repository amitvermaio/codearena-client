import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminPanel from "../pages/admin/AdminPanel";
import ProblemList from "../pages/problems/ProblemPage";
import ProblemDetails from "../pages/problems/ProblemDetails";
import UserProfile from "../pages/profile/UserProfile";
import ContestList from "../pages/contests/ContestList";
import ContestProblems from "../pages/contests/ContestProblems";
import ProblemOfTheDay from "../pages/potd/ProblemOfTheDay";
import IDE from "../pages/tools/IDE";
import CodeConverter from "../pages/tools/CodeConverter";
import NotFound from "../pages/NotFound";
import VerifyEmail from "../pages/auth/VerifyEmail";
import Summarizer from "../pages/tools/Summarizer";
import Tools from "../pages/tools/Tools";
import UserSettings from "../pages/problems/UserAccount";
import ProfileSettings from "../pages/settings/ProfileSettings";
import SecuritySettings from "../pages/settings/SecuritySettings";
import ForgotPassword from "../pages/auth/ForgotPassword";

import MainLayout from "@/components/layout/MainLayout";
import AdminRoute from "../components/AdminRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import SettingsLayout from "@/components/layout/SettingsLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import UserManagement from "@/pages/admin/UserManagement";

const Mainroutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/create-account" element={<Register />} />
      <Route path="/verify-account" element={<VerifyEmail />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/auth/reset-password/:token" element={<ResetPassword />} /> */}


      {/* Problems */}
      <Route path="/problems/:problemId" element={<ProblemDetails />} />

      {/* Contests */}
      <Route path="/contests/:contestId" element={<ContestProblems />} />

      {/* Problem of the Day */}
      <Route path="/potd" element={<ProblemOfTheDay />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />

{/* <ProtectedRoute><AdminRoute><AdminPanel /></AdminRoute></ProtectedRoute> */}
      <Route path="/administration" element={<AdminLayout />}>
        <Route index element={<AdminPanel />} />
        <Route path="user-management" element={<UserManagement />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/contests" element={<ContestList />} />
        <Route path="/tools" element={<Tools />} />
        {/* Tools */}
        <Route path="/tools/ide" element={<IDE />} />
        <Route path="/tools/code-converter" element={<CodeConverter />} />
        <Route path="/tools/summarizer" element={<Summarizer/>} />
        
        {/* profile */}
        <Route path="/u/:username" element={<UserProfile />} />

        {/* settings */}
        <Route path="/u/:username/settings" element={<SettingsLayout />}>
          <Route index element={<ProfileSettings />} />
          <Route path="account" element={<UserSettings />} />
          <Route path="security" element={<SecuritySettings />} />
        </Route>

      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Mainroutes;
