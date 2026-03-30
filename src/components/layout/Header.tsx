"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Heart, GitCompare, Building2, User, LogOut, LayoutDashboard, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavoritesStore } from "@/store/favorites.store";
import { useCompareStore } from "@/store/compare.store";
import { useAuthStore } from "@/store/auth.store";

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const compareIds = useCompareStore((state) => state.compareIds);

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  const isAdmin = user?.role?.name === "admin" || user?.role?.name === "super_admin";

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 transition-shadow duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-gray-900 dark:text-white" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            PakKoreaBiz
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/search"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Search
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Categories
          </Link>
          <Link
            href="/cities"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Cities
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {favoriteIds.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {favoriteIds.length}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/compare">
            <Button variant="ghost" size="icon" className="relative">
              <GitCompare className="h-5 w-5" />
              {compareIds.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                  {compareIds.length}
                </span>
              )}
            </Button>
          </Link>

          <Button className="hidden md:inline-flex" size="sm">
            <Link href="/claim">List Your Business</Link>
          </Button>

          {/* Auth Buttons */}
          {isAuthenticated && user ? (
            <div className="relative hidden md:block" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                    <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
                <span className="max-w-[100px] truncate">{user.name}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
                  >
                    <div className="border-b border-gray-100 px-4 py-2 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <Shield className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:hidden"
          >
            <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
              <Link
                href="/search"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/cities"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cities
              </Link>
              <Button size="sm" className="w-full">
                <Link href="/claim">List Your Business</Link>
              </Button>
              {isAuthenticated && user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="text-left text-sm font-medium text-red-600 dark:text-red-400"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Sign in</Button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
