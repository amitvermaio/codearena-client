import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [params] = useSearchParams();

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