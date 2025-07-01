import React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative overflow-hidden"
    >
      {/* Sun icon: visible in light mode, transitions out in dark mode */}
      <Sun
        className={`h-5 w-5 absolute transition-all duration-300 ease-in-out
          ${
            theme === "dark"
              ? "-rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }
        `}
      />
      {/* Moon icon: visible in dark mode, transitions out in light mode */}
      <Moon
        className={`h-5 w-5 absolute transition-all duration-300 ease-in-out
          ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
