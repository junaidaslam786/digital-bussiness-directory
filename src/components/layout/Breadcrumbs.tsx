import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
