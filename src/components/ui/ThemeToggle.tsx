"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const btnRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    const handleClick = () => {
        const next = isDark ? "light" : "dark";
        setTheme(next);

        // Tactile scale feedback
        const btn = btnRef.current;
        if (btn) {
            btn.style.transform = "scale(0.88)";
            setTimeout(() => { btn.style.transform = "scale(1)"; }, 150);
        }
    };

    if (!mounted) {
        return (
            <button
                aria-hidden
                tabIndex={-1}
                className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center opacity-0 pointer-events-none"
            >
                <div className="w-5 h-5" />
            </button>
        );
    }

    return (
        <button
            ref={btnRef}
            id="theme-toggle"
            title={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
            aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
            onClick={handleClick}
            className="w-10 h-10 rounded-full flex items-center justify-center border group
                       dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20
                       bg-black/5 hover:bg-black/10 border-black/10 hover:border-black/20"
            style={{ transition: "transform 0.15s ease, background 0.2s ease" }}
        >
            {/* Sun — shown when dark (click → go light) */}
            <Sun className="h-5 w-5 hidden dark:block text-hemo-lime transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
            {/* Moon — shown when light (click → go dark) */}
            <Moon className="h-5 w-5 dark:hidden text-hemo-dark transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
        </button>
    );
}
