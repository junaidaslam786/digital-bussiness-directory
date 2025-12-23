import { SearchBar } from "@/components/common/SearchBar";
import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CityCard } from "@/components/city/CityCard";
import { Button } from "@/components/ui/Button";
import { PakistanFlag, SouthKoreaFlag } from "@/components/common/Flags";
import { enterprises } from "@/data/enterprises.mock";
import { categories } from "@/data/categories.mock";
import { cities } from "@/data/cities.mock";
import { ArrowRight, TrendingUp, MapPin, Building2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // Get featured enterprises - for now just take highly rated ones
  const featuredEnterprises = [...enterprises]
    .sort((a, b) => b.ratingAvg - a.ratingAvg)
    .filter(e => e.verified)
    .slice(0, 6);
  
  const topRatedEnterprises = [...enterprises]
    .sort((a, b) => b.ratingAvg - a.ratingAvg)
    .slice(0, 6);

  // Get popular categories and cities (first 8 of each)
  const popularCategories = categories.slice(0, 8);
  const popularCities = cities.slice(0, 8);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden min-h-[600px]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/hero-background.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        /> 
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-800/70" />
        
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center relative z-10">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              {/* Discover South Korea's Best Businesses */}Pakistan Korea Digital Business Directory
            </h1>
            <p className="mb-8 text-lg text-gray-300 md:text-xl">
              Find and connect with verified enterprises across all major cities and industries
            </p>
            <div className="mx-auto max-w-2xl">
              <SearchBar variant="large" />
            </div>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 text-center md:gap-8">
              <div>
                <div className="text-3xl font-bold md:text-4xl">{enterprises.length}+</div>
                <div className="text-sm text-gray-400 md:text-base">Businesses</div>
              </div>
              <div>
                <div className="text-3xl font-bold md:text-4xl">{categories.length}+</div>
                <div className="text-sm text-gray-400 md:text-base">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold md:text-4xl">{cities.length}+</div>
                <div className="text-sm text-gray-400 md:text-base">Cities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Enterprises */}
      {featuredEnterprises.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Featured Businesses
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Verified and recommended enterprises
                </p>
              </div>
              <Link href="/search?featured=true">
                <Button variant="outline">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEnterprises.map((enterprise) => (
                <EnterpriseCard key={enterprise.slug} enterprise={enterprise} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Rated */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-gray-900 dark:text-white" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Top Rated
                </h2>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Highest rated businesses by customer reviews
              </p>
            </div>
            <Link href="/search?sort=rating">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topRatedEnterprises.map((enterprise) => (
              <EnterpriseCard key={enterprise.slug} enterprise={enterprise} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-gray-900 dark:text-white" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Browse by Category
                </h2>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Explore businesses by industry
              </p>
            </div>
            <Link href="/categories">
              <Button variant="outline">
                All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {popularCategories.map((category) => {
              const count = enterprises.filter(
                (e) => e.categories.some((c) => c.slug === category.slug)
              ).length;
              return (
                <CategoryCard key={category.slug} category={category} count={count} />
              );
            })}
          </div>
        </div>
      </section>

      {/* Browse by City */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-8 w-8 text-gray-900 dark:text-white" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Browse by City
                </h2>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Find businesses in major South Korean cities
              </p>
            </div>
            <Link href="/cities">
              <Button variant="outline">
                All Cities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {popularCities.map((city) => {
              const count = enterprises.filter((e) => e.address.city === city.nameEn).length;
              return <CityCard key={city.slug} city={city} count={count} />;
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Own a Business?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Join thousands of businesses on KoreaBiz Directory and reach more customers
          </p>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
            List Your Business
          </Button>
        </div>
      </section>
    </div>
  );
}
