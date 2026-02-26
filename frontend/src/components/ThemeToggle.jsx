import React from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center gap-2
      border border-neutral-500 px-2 py-1
      text-sm transition-transform
      hover:-translate-y-1px"
    >
      <Sun
        size={14}
        className={`${theme === "light" ? "opacity-100" : "opacity-40"}`}
      />
      <div className="w-1px h-4 bg-neutral-400" />
      <Moon
        size={14}
        className={`${theme === "dark" ? "opacity-100" : "opacity-40"}`}
      />
    </button>
  );
};

export default ThemeToggle;
