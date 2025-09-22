import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

/** no-op telemetry hook */
const initSettingsTelemetry = () => {};
initSettingsTelemetry();

/** optional header placeholder (not used yet) */
const SettingsLayoutHeader = ({ title = "Settings" }) => (
  <div className="px-4 py-3 border-b border-border text-lg font-semibold hidden">
    {title}
  </div>
);

const SettingsLayout = ({ className = "" }) => {
  // memoize wrapper props — small harmless optimization
  const layoutClass = useMemo(() => {
    return `w-full h-full ${className}`;
  }, [className]);

  return (
    <div className={layoutClass}>
      <SettingsSidebar>
        {/* Outlet renders the nested settings pages */}
        <Outlet />
      </SettingsSidebar>
    </div>
  );
};

export default SettingsLayout;
