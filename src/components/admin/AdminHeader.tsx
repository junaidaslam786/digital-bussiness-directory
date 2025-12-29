"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Moon, Sun, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export function AdminHeader() {
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(false);

    // Generate breadcrumbs from pathname
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => {
        const path = "/" + pathSegments.slice(0, index + 1).join("/");
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        return { label, path };
    });

    useEffect(() => {
        // Check if dark mode is enabled
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(isDarkMode);
    }, []);

    const toggleDarkMode = () => {
        // This is a placeholder - in production, you'd use a theme provider
        setIsDark(!isDark);
    };

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm">
                <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    Home
                </Link>
                {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.path} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        {index === breadcrumbs.length - 1 ? (
                            <span className="font-medium text-gray-900 dark:text-white">
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                href={crumb.path}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                    <Bell className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}
