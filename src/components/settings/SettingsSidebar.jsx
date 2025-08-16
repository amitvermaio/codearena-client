import React from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Shield,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";


const settingsNavItems = [
  { label: "Profile", icon: User, href: "" },
  { label: "Account", icon: Settings, href: "account" },
  { label: "Security", icon: Shield, href: "security" },
];

const SettingsSidebar = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <nav className="flex flex-col space-y-2">
            <Button variant="ghost" asChild className="justify-start mb-4">
              <Link to="/problems">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to App
              </Link>
            </Button>

            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.label}
                  variant={isActive ? "secondary" : "ghost"}
                  asChild
                  className="justify-start"
                >
                  <Link to={`/u/${params.username}/settings/${item.href}`}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  );
}

export default SettingsSidebar;