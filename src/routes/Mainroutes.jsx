import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminPanel from "../pages/admin/AdminPanel";
import ProblemList from "../pages/problems/ProblemList";
import ProblemDetails from "../pages/problems/ProblemDetails";
import UserProfile from "../pages/profile/UserProfile";
import ContestList from "../pages/contests/ContestList";
import ContestProblems from "../pages/contests/ContestProblems";
import ProblemOfTheDay from "../pages/potd/ProblemOfTheDay";
import IDE from "../pages/tools/IDE";
import CodeConverter from "../pages/tools/CodeConverter";
import NotFound from "../pages/NotFound";

import AdminRoute from "../components/AdminRoute";
import ProtectedRoute from "../components/ProtectedRoute";

const Mainroutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Problems */}
      <Route path="/problems" element={<ProblemList />} />
      <Route path="/problems/:problemId" element={<ProblemDetails />} />

      {/* Contests */}
      <Route path="/contests" element={<ContestList />} />
      <Route path="/contests/:contestId" element={<ContestProblems />} />

      {/* Tools */}
      <Route path="/tools/ide" element={<IDE />} />
      <Route path="/tools/code-converter" element={<CodeConverter />} />

      {/* Problem of the Day */}
      <Route path="/potd" element={<ProblemOfTheDay />} />

      {/* User Profile */}
      <Route path="/profile/:userId" element={<UserProfile />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute><AdminRoute><AdminPanel /></AdminRoute></ProtectedRoute>
      } />


      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Mainroutes;
