import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Home,
  Users,
  FileCode,
  Trophy,
  Settings,
  LogOut,
  BarChart,
  ArrowLeft,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const adminNavItems = [
  { label: "Dashboard", icon: Home, href: "/administration" },
  { label: "Users", icon: Users, href: "/administration/users-management" },
  { label: "Problems", icon: FileCode, href: "/administration/problems-management" },
  { label: "Contests", icon: Trophy, href: "/administration/contests-management" },
  { label: "Analytics", icon: BarChart, href: "/administration/analytics" },
  { label: "Settings", icon: Settings, href: "/administration/settings" },
];

function AdminBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  if (!pathSegments[1]) return null;

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/admin">Admin</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.slice(1).map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 2).join("/")}`;
          const isLast = index === pathSegments.length - 2;
          const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-foreground">{label}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

const AdminPanelSidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link to="/">
            <Logo />
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => {
              const active = location.pathname === item.href;

              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={active}>
                    <Link to={item.href}>
                      <item.icon />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Admin User</span>
              <span className="text-xs text-muted-foreground">admin@codearena.io</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />

            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex"
              onClick={() => navigate("/problems")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to App
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="flex md:hidden"
              onClick={() => navigate("/problems")}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to App</span>
            </Button>

            <AdminBreadcrumb />
          </div>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </header>

        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AdminPanelSidebar;
