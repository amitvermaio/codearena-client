import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Swords,
  Users,
  Menu,
  Moon,
  Sun,
  Bell,
  User as UserIcon,
  Settings,
  Shield,
  LogOut,
  Wand2,
} from "lucide-react";
import { cn } from "../lib/utils"; // adjust path
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "../components/shared/Logo";
import axios from "../config/axios.config.jsx";
import { toast } from "sonner";
import { fetchUserProfile, verifyAuth } from "@/store/actions/user/userAction";
import { useDispatch, useSelector } from "react-redux";

// Dummy data instead of API call
const getNotifications = () => {
  return Promise.resolve([
    { id: 1, read: false, message: "New contest starting soon!" },
    { id: 2, read: true, message: "Problem set updated" },
  ]);
};

const navItems = [
  { href: "/problems", label: "Problems", icon: LayoutGrid },
  { href: "/contests", label: "Contests", icon: Swords },
  { href: "/tools", label: "Tools", icon: Wand2 },
];

// Simple Theme Toggle Mock
const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:hidden" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] hidden dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { username, fullname, avatar } = useSelector(state => state.user?.user?.data || "");


  const LogoutHandler = async () => {
    try {
      const res = await axios.post('/auth/logout');
      console.log("Logout response: ", res);
      if (res.status === 200) {
        dispatch(verifyAuth());
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) => {
      const isActive = location.pathname.startsWith(item.href);
      return (
        <Button
          key={item.href}
          variant={isActive ? "secondary" : "ghost"}
          size={isMobile ? "default" : "sm"}
          className={cn("justify-start gap-2", isMobile ? "w-full" : "rounded-full")}
          asChild
        >
          <Link to={item.href} onClick={() => isMobile && setIsSheetOpen(false)}>
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        </Button>
      );
    });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-transform duration-300",
        !isNavVisible && "-translate-y-full"
      )}
    >
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:flex-1">
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-4">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                <Link to="/" className="mb-6 flex" onClick={() => setIsSheetOpen(false)}>
                  <Logo />
                </Link>
                <div className="flex flex-col gap-2">{renderNavLinks(true)}</div>
              </SheetContent>
            </Sheet>
          </div>
          <Link to="/" className="hidden md:flex">
            <Logo />
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center gap-1 rounded-full border bg-card/50 p-1">{renderNavLinks()}</div>
        </div>

        <div className="flex items-center justify-end gap-2 md:flex-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link to="/notifications" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage src={`${avatar}`} alt="User profile" />
                  <AvatarFallback>{fullname?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{fullname ? fullname : "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">@{username ? username : "user"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to={`/u/${username}`} className="flex items-center w-full">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/u/${username}/settings`} className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/administration`} className="flex items-center w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={LogoutHandler}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
