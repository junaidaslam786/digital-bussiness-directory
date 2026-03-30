import Link from "next/link";
import { Building2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-gray-900 dark:text-white" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                KoreaBiz
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              South Korea's premier business directory connecting enterprises across the nation.
            </p>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              For Businesses
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/claim" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Claim Your Business
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Business Owner Login
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Discover
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/cities" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  All Cities
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Search Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} KoreaBiz Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
