"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("rm-theme", next);
    } catch {}
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch light or dark"
      className="press grid h-10 w-10 place-items-center rounded-[10px] border border-line text-ink-2 hover:border-line-strong hover:text-ink"
    >
      <Sun className="h-[18px] w-[18px] dark:hidden" />
      <Moon className="hidden h-[18px] w-[18px] dark:block" />
    </button>
  );
}
