import { CategoryCard } from "@/components/category/CategoryCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { categories } from "@/data/categories.mock";
import { enterprises } from "@/data/enterprises.mock";
import { Building2 } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
        ]}
      />

      <div className="mb-8 mt-4">
        <div className="flex items-center space-x-3">
          <Building2 className="h-10 w-10 text-gray-900 dark:text-white" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              All Categories
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Browse businesses by industry and category
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {categories.map((category) => {
          const count = enterprises.filter((e) =>
            e.categories.some((c) => c.slug === category.slug)
          ).length;
          return (
            <CategoryCard key={category.slug} category={category} count={count} />
          );
        })}
      </div>
    </div>
  );
}
