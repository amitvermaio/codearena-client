import { Link, Outlet } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../../store/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const ProblemsProtected = () => {
  return (
    <div>
      {loginSuccess && <Outlet />}
    </div>
  )
}

export default ProblemsProtected;