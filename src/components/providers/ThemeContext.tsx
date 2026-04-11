"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface AppThemeContextValue {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
    toggleTheme: () => void;
    mounted: boolean;
    isDark: boolean;
}

const AppThemeContext = React.createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const resolvedAsTyped = (resolvedTheme === "dark" ? "dark" : "light") as "light" | "dark";

    const toggleTheme = React.useCallback(() => {
        setTheme(resolvedAsTyped === "dark" ? "light" : "dark");
    }, [resolvedAsTyped, setTheme]);

    const typedSetTheme = React.useCallback(
        (t: "light" | "dark") => setTheme(t),
        [setTheme]
    );

    const value = React.useMemo<AppThemeContextValue>(
        () => ({
            theme: resolvedAsTyped,
            setTheme: typedSetTheme,
            toggleTheme,
            mounted,
            isDark: resolvedAsTyped === "dark",
        }),
        [resolvedAsTyped, typedSetTheme, toggleTheme, mounted]
    );

    // Avoid context updates causing layout issues before mount
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <AppThemeContext.Provider value={value}>
            {children}
        </AppThemeContext.Provider>
    );
}

/** Type-safe hook for consuming the app theme context */
export function useAppTheme(): AppThemeContextValue {
    const ctx = React.useContext(AppThemeContext);
    if (!ctx) {
        // Fallback for SSR / pre-mount — returns safe defaults
        return {
            theme: "light",
            setTheme: () => {},
            toggleTheme: () => {},
            mounted: false,
            isDark: false,
        };
    }
    return ctx;
}
