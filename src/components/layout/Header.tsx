"use client";

import Link from "next/link";
import { Search, Menu, Heart, GitCompare, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavoritesStore } from "@/store/favorites.store";
import { useCompareStore } from "@/store/compare.store";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const compareSlugs = useCompareStore((state) => state.compareSlugs);

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
              {compareSlugs.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                  {compareSlugs.length}
                </span>
              )}
            </Button>
          </Link>

          <Button className="hidden md:inline-flex" size="sm">
            List Your Business
          </Button>

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
                List Your Business
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
