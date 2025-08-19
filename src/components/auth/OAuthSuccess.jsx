import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  // On successful OAuth, store token in localStorage and redirect to /problems
  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, token);
      window.location.href = "/problems";
      return;
    }
  }, []);

  return <p>Redirecting...</p>;
};

export default OAuthSuccess;