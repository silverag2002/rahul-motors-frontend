"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative h-10 w-10 rounded-full border flex items-center justify-center transition-colors hover:bg-[var(--bg-muted)]"
      style={{ borderColor: "var(--line-strong)" }}
    >
      <Sun
        className="h-4 w-4 absolute transition-all duration-500 rotate-0 scale-100 data-[hidden=true]:rotate-90 data-[hidden=true]:scale-0"
        data-hidden={theme === "dark"}
        style={{ color: "var(--ink)" }}
      />
      <Moon
        className="h-4 w-4 absolute transition-all duration-500 rotate-0 scale-100 data-[hidden=true]:-rotate-90 data-[hidden=true]:scale-0"
        data-hidden={theme === "light"}
        style={{ color: "var(--ink)" }}
      />
    </button>
  );
}
