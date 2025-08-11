import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo"

// Utility: Tailwind class joiner
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Theme Toggle (React only)
function ThemeToggle({ isMobile = false }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-between rounded-lg border p-3">
        <span className="text-sm">Switch Theme</span>
        <button
          className="p-2 rounded"
          onClick={toggleTheme}
        >
          <Sun className="h-5 w-5 dark:hidden" />
          <Moon className="h-5 w-5 hidden dark:block" />
        </button>
      </div>
    );
  }

  return (
    <button
      className="p-2 rounded"
      onClick={toggleTheme}
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="h-5 w-5 hidden dark:block" />
    </button>
  );
}

// Main Navbar
export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-sm border-b dark:bg-black/80"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <div className="hidden md:flex h-16 items-center justify-between">
          <a href="/" aria-label="Go to Homepage">
            <Logo />
          </a>
          <nav className="flex items-center gap-4">
            <ThemeToggle />
            <a href="/signin" className="px-4 py-2 rounded hover:bg-gray-100">
              Sign In
            </a>
            <a
              href="/create-account"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Get Started
            </a>
          </nav>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex h-16 items-center justify-between">
          <a href="/" aria-label="Go to Homepage">
            <Logo />
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-900 w-64 h-full p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="mb-4 block"
              >
                Close
              </button>
              <div className="space-y-4">
                <a
                  href="/create-account"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ArrowRight /> Get Started
                </a>
                <a
                  href="/signin"
                  className="block px-4 py-2 border rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </a>
                <div className="pt-4">
                  <ThemeToggle isMobile />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
