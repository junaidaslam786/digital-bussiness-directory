"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Bell, User, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBusinessesStore } from "@/store/businesses.api";
import { useAuthStore } from "@/store/auth.store";
import { useState, useRef, useEffect } from "react";

export function EnterpriseTopBar() {
    const pathname = usePathname();
    const router = useRouter();
    const { myBusinesses } = useBusinessesStore();
    const { user, logout } = useAuthStore();
    const business = myBusinesses[0];
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleLogout = async () => {
        setMenuOpen(false);
        await logout();
        router.push("/");
    };

    // Generate breadcrumbs from pathname
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => {
        const path = "/" + pathSegments.slice(0, index + 1).join("/");
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        return { label, path };
    });

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-950">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm">
                <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <Home className="h-4 w-4" />
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
                {business && (
                    <Link href={`/enterprises/${business.id}`} className="mr-2">
                        <Button variant="outline" size="sm">
                            View Public Profile
                        </Button>
                    </Link>
                )}
                <Link href="/dashboard/settings">
                    <Button variant="ghost" size="icon" aria-label="Settings">
                        <Bell className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="relative" ref={menuRef}>
                    <Button variant="ghost" size="icon" aria-label="Account" onClick={() => setMenuOpen(!menuOpen)}>
                        {user?.avatarUrl ? (
                            <img src={user.avatarUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
                        ) : (
                            <User className="h-5 w-5" />
                        )}
                    </Button>
                    {menuOpen && (
                        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                            {user && (
                                <div className="border-b border-gray-100 px-4 py-2 dark:border-gray-800">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                </div>
                            )}
                            <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                                <User className="h-4 w-4" />
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
