import { Outlet } from "react-router-dom";
import AdminPanelSidebar from "../admin/AdminPanelSidebar";

const AdminLayout = () => {

  return (
    <AdminPanelSidebar>
      <Outlet /> 
    </AdminPanelSidebar>
  );
}
//hello
export default AdminLayout;