import { Outlet } from "react-router-dom";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

const SettingsLayout = () => {

  return (
    <SettingsSidebar>
      <Outlet /> 
    </SettingsSidebar>
  );
}

export default SettingsLayout;