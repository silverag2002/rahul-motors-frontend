"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative h-10 w-10 border flex items-center justify-center transition-colors hover:bg-[var(--bg-muted)]"
      style={{ borderColor: "var(--line-strong)" }}
    >
      <Sun
        className="theme-sun h-4 w-4 absolute transition-all duration-300"
        style={{ color: "var(--ink)" }}
      />
      <Moon
        className="theme-moon h-4 w-4 absolute transition-all duration-300"
        style={{ color: "var(--ink)" }}
      />
    </button>
  );
}
