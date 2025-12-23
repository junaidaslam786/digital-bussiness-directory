import { CityCard } from "@/components/city/CityCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { cities } from "@/data/cities.mock";
import { enterprises } from "@/data/enterprises.mock";
import { MapPin } from "lucide-react";

export default function CitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
        ]}
      />

      <div className="mb-8 mt-4">
        <div className="flex items-center space-x-3">
          <MapPin className="h-10 w-10 text-gray-900 dark:text-white" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              All Cities
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Find businesses in major South Korean cities
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {cities.map((city) => {
          const count = enterprises.filter((e) => e.address.city === city.nameEn).length;
          return <CityCard key={city.slug} city={city} count={count} />;
        })}
      </div>
    </div>
  );
}
