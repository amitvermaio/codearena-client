import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate(); 
  const user = useSelector((state) => state.user.user);

  return user?.role === "admin" ? children : navigate(-1);
};

export default AdminRoute;
