import { Link, Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "@/config/axios.config";

/**
 * ProtectedRoute
 * - Attempts a one-time silent refresh when no token exists
 * - Shows clear loading / restoring UI
 * - Redirects to /signin (preserving `from` state) if no session
 *
 * Small refactor: extracted Loader components and centralized token key.
 */

const TOKEN_KEY = import.meta.env.VITE_TOKEN_NAME || "access_token";

const Loader = ({ children = "Checking authentication..." }) => (
  <div style={{ padding: 24 }}>{children}</div>
);

const RestoringSession = () => <Loader>Restoring your session...</Loader>;

const ProtectedRoute = ({ children }) => {
  const loading = useSelector((state) => state.user?.loading);
  const location = useLocation();

  // track whether we are attempting a silent refresh
  const [attemptingRefresh, setAttemptingRefresh] = useState(false);
  const triedRefreshRef = useRef(false);

  // token lives in state so a successful refresh re-renders the component
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
  );

  // show an early loading state if the global auth flag is still loading
  if (loading) return <Loader />;

  // Kick off a single silent refresh attempt if no token and we haven't tried yet
  if (!token && !triedRefreshRef.current) {
    triedRefreshRef.current = true;
    setAttemptingRefresh(true);
  }

  useEffect(() => {
    let cancelled = false;
    if (!attemptingRefresh) return;

    (async () => {
      try {
        // silent refresh — server should issue a new token if refresh cookie/session is valid
        const res = await axios.post(
          "/auth/refresh-token",
          {}, // no body
          {
            // explicitly avoid sending Authorization header for silent refresh
            headers: { Authorization: undefined },
          }
        );

        const newToken = res?.data?.token;
        if (newToken && !cancelled) {
          localStorage.setItem(TOKEN_KEY, newToken);
          setToken(newToken);
        }
      } catch (err) {
        // intentionally silent — we will redirect below if there's no token
        // but we log during development for visibility
        if (process.env.NODE_ENV !== "production") {
          console.warn("Silent token refresh failed:", err?.message || err);
        }
      } finally {
        if (!cancelled) setAttemptingRefresh(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [attemptingRefresh]);

  // If still trying to refresh, show restoring UI
  if (!token) {
    if (attemptingRefresh) return <RestoringSession />;

    // refresh not possible / failed — redirect to signin and preserve intended path
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
