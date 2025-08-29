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
  IndianRupee,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const adminNavItems = [
  { label: "Dashboard", icon: Home, href: "/admin" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Problems", icon: FileCode, href: "/admin/problems" },
  { label: "Contests", icon: Trophy, href: "/admin/contests" },
  { label: "Subscriptions", icon: CreditCard, href: "/admin/subscriptions" },
  { label: "Analytics", icon: BarChart, href: "/admin/analytics" },
  { label: "Earnings", icon: IndianRupee, href: "/admin/earnings" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

function AdminBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  if (pathSegments.length <= 1) {
    return null;
  }

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
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);
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
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                  <Link to={item.href}>
                    <item.icon />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
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
}

export default AdminPanelSidebar;