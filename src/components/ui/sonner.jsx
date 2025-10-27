// src/components/ui/sonner.jsx
import React, { useMemo } from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const DEFAULT_TOAST_OPTIONS = {
  duration: 5000,
  position: "top-right",
  classNames: {
    toast:
      "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
    description: "group-[.toast]:text-muted-foreground",
    actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
    cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
  },
};

function mapThemeToSonner(theme) {
  // sonner expects "light" or "dark" (or undefined). Map system/other values conservatively.
  if (!theme) return undefined;
  const t = String(theme).toLowerCase();
  if (t === "dark") return "dark";
  if (t === "light") return "light";
  return undefined;
}

const Toaster = ({ toastOptions = {}, ...props }) => {
  const { theme } = useTheme?.() ?? { theme: undefined };

  const mergedOptions = useMemo(() => {
    return {
      ...DEFAULT_TOAST_OPTIONS,
      ...toastOptions,
      classNames: {
        ...DEFAULT_TOAST_OPTIONS.classNames,
        ...(toastOptions.classNames || {}),
      },
    };
  }, [toastOptions]);

  const sonnerTheme = useMemo(() => mapThemeToSonner(theme), [theme]);

  return <Sonner theme={sonnerTheme} toastOptions={mergedOptions} {...props} />;
};

export default Toaster;
export { Toaster };
