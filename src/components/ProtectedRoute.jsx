import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "@/config/axios.config";
const ProtectedRoute = ({ children }) => {
  const loading = useSelector((state) => state.user?.loading);
  const location = useLocation();
  const [attemptingRefresh, setAttemptingRefresh] = useState(false);
  const triedRefreshRef = useRef(false);
  // Track token in state to trigger re-render after a successful silent refresh
  const [token, setToken] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  );

  if (loading) {
    return <div style={{ padding: 24 }}>Checking authentication...</div>;
  }

  // Try a one-time silent refresh if no token is present
  if (!token && !triedRefreshRef.current) {
    triedRefreshRef.current = true;
    setAttemptingRefresh(true);
  }

  useEffect(() => {
    if (!attemptingRefresh) return;
    (async () => {
      try {
        const res = await axios.post('/auth/refresh-token', null, {
          headers: { Authorization: undefined },
        });
        const newToken = res?.data?.token;
        if (newToken) {
          localStorage.setItem('access_token', newToken);
          setToken(newToken);
        }
      } catch (_) {
        // ignore; will redirect below
      } finally {
        setAttemptingRefresh(false);
      }
    })();
  }, [attemptingRefresh]);

  if (!token) {
    // While attempting a silent refresh, show a minimal loader
    if (attemptingRefresh) {
      return <div style={{ padding: 24 }}>Restoring your session...</div>;
    }
    // If refresh failed or not available, redirect to signin
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
}

export default ProtectedRoute