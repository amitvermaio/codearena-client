import { Logo } from "@/components/shared/Logo"
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, ArrowRight } from 'lucide-react';



/**
 * A simplified hook to manage theme state, replacing `next-themes`.
 * This implementation toggles a 'dark' class on the root <html> element.
 * NOTE: It assumes a CSS setup (like Tailwind CSS) uses this class for dark mode styling.
 * e.g., .dark .bg-white { background-color: #000; }
 */
const useTheme = () => {
  const [theme, setThemeState] = useState(() => {
    // On initial load, check for saved theme or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default for server-side rendering
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return { theme, setTheme };
};

// --- Converted Components ---

/**
 * ThemeToggle component for switching between light and dark modes.
 */
function ThemeToggle({ isMobile = false }) {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // The class names for icons rely on a 'dark' class on a parent element
  // to toggle visibility (e.g., `dark:scale-0`).
  const sunIcon = <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />;
  const moonIcon = <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />;

  if (isMobile) {
    return (
      <div className="flex items-center justify-between rounded-lg border p-3">
        <span className="text-sm">Switch Theme</span>
        <button
          type="button"
          className="relative inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={toggleTheme}
        >
          {sunIcon}
          {moonIcon}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="relative inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={toggleTheme}
    >
      {sunIcon}
      {moonIcon}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

/**
 * The main LandingNavbar component, now in standard React.
 */
export function LandingNavbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect to detect if the page has been scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Replicating the `cn` utility with template literals
  const headerClasses = `
    sticky top-0 left-0 right-0 z-50 transition-all duration-300
    ${scrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent border-b border-transparent"}
  `;

  // Placeholder classes for buttons to mimic the original style.
  const buttonBase = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2";
  const buttonPrimary = "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const buttonGhost = "hover:bg-accent hover:text-accent-foreground text-sm font-medium transition-colors px-4 py-2 rounded-md";

  return (
    <header className={headerClasses.trim().replace(/\s+/g, ' ')}>
      <div className="container mx-auto px-4">
        {/* --- Desktop Navbar --- */}
        <div className="hidden md:flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <ThemeToggle />
            {/* Replaced Button asChild + Link with a styled <a> tag */}
            <a href="/signin" className={buttonGhost}>Sign In</a>
          </nav>
        </div>

        {/* --- Mobile Navbar --- */}
        <div className="md:hidden flex h-16 items-center justify-between">
          <Logo />
          {/* Replaced SheetTrigger with a simple button */}
          <button onClick={() => setIsSheetOpen(true)} className={buttonGhost + " p-2"}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* --- Mobile Menu (Sheet) --- */}
      {/* Replaced Sheet/SheetContent with a conditionally rendered div */}
      {isSheetOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60"
          onClick={() => setIsSheetOpen(false)}
        >
          <div
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-black p-0"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the menu
          >
            {/* Replaced SheetHeader */}
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <p className="sr-only">Main navigation menu</p>
            </div>

            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <a
                  href="/create-account"
                  className={`${buttonPrimary} w-full justify-start gap-2`}
                  onClick={() => setIsSheetOpen(false)}
                >
                  <ArrowRight /> Get Started
                </a>
                <a
                  href="/signin"
                  className={`${buttonBase} border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full justify-start`}
                  onClick={() => setIsSheetOpen(false)}
                >
                  Sign In
                </a>
              </div>
              <div className="pt-4">
                <ThemeToggle isMobile />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}