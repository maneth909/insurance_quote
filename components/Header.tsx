"use client";

import { Moon, Sun, ShieldCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            WECARE{" "}
            <span className="font-medium text-neutral-500 dark:text-neutral-400">
              Broker
            </span>
          </span>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
