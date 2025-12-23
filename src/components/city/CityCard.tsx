import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { City } from "@/types";
import { MapPin } from "lucide-react";

interface CityCardProps {
  city: City;
  count?: number;
}

export function CityCard({ city, count }: CityCardProps) {
  return (
    <Link href={`/cities/${city.slug}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-900 dark:bg-gray-800 dark:group-hover:bg-gray-100">
              <MapPin className="h-8 w-8 text-gray-900 transition-colors group-hover:text-white dark:text-gray-100 dark:group-hover:text-gray-900" />
            </div>

            {/* Name */}
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              {city.nameEn}
            </h3>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              {city.nameKo}
            </p>

            {/* Province */}
            <p className="mb-3 text-xs text-gray-500">{city.province}</p>

            {/* Count */}
            {count !== undefined && (
              <p className="text-xs font-medium text-gray-500">
                {count} {count === 1 ? 'business' : 'businesses'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
