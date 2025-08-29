import { Outlet } from "react-router-dom";
import AdminPanelSidebar from "../admin/AdminPanelSidebar";

const AdminLayout = () => {

  return (
    <AdminPanelSidebar>
      <Outlet /> 
    </AdminPanelSidebar>
  );
}

export default AdminLayout;