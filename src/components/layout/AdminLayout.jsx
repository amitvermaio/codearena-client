import { Outlet } from "react-router-dom";
import AdminPanelSidebar from "../admin/AdminPanelSidebar";

const AdminLayout = () => {
  // Layout

  return (
    <AdminPanelSidebar>
      <Outlet />
    </AdminPanelSidebar>
  );
}
//hello
export default AdminLayout;