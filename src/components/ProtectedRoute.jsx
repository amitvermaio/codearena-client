import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user?.user.data);

  return (
    <div>
      Protected Route
    </div>
  )
}

export default ProtectedRoute