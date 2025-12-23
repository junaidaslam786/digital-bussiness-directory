import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { enterprises } from "@/data/enterprises.mock";
import { categories } from "@/data/categories.mock";
import { cities } from "@/data/cities.mock";
import { reviews } from "@/data/reviews.mock";
import { Building2, Users, Star, MapPin, TrendingUp, Calendar, Eye, Plus } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  // Calculate stats
  const totalEnterprises = enterprises.length;
  const verifiedEnterprises = enterprises.filter((e) => e.verified).length;
  const totalReviews = reviews.length;
  const avgRating =
    enterprises.reduce((sum, e) => sum + e.ratingAvg, 0) / enterprises.length;

  // Recent enterprises
  const recentEnterprises = [...enterprises]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Top rated
  const topRated = [...enterprises]
    .sort((a, b) => b.ratingAvg - a.ratingAvg)
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your business directory
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Businesses
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalEnterprises}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {verifiedEnterprises} verified
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Categories
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {categories.length}
                </p>
                <p className="mt-1 text-xs text-gray-500">Active categories</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Reviews
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {totalReviews}
                </p>
                <p className="mt-1 text-xs text-gray-500">Avg {avgRating.toFixed(1)} rating</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cities</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {cities.length}
                </p>
                <p className="mt-1 text-xs text-gray-500">Across South Korea</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Enterprises */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Recently Updated</span>
              </CardTitle>
              <Link href="/search">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEnterprises.map((enterprise) => (
                <div
                  key={enterprise.slug}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                >
                  <div className="flex-1">
                    <Link
                      href={`/enterprises/${enterprise.slug}`}
                      className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    >
                      {enterprise.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {enterprise.categories[0].name} • {enterprise.address.city}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {enterprise.verified && (
                      <Badge variant="success" className="text-xs">
                        Verified
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/enterprises/${enterprise.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Rated */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Top Rated Businesses</span>
              </CardTitle>
              <Link href="/search?sort=rating">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRated.map((enterprise, index) => (
                <div
                  key={enterprise.slug}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/enterprises/${enterprise.slug}`}
                        className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                      >
                        {enterprise.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {enterprise.ratingAvg.toFixed(1)} ★ ({enterprise.ratingCount} reviews)
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/enterprises/${enterprise.slug}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button className="w-full" asChild>
              <Link href="/claim">
                <Plus className="mr-2 h-4 w-4" />
                Add Business
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/categories">
                <Eye className="mr-2 h-4 w-4" />
                View Categories
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/cities">
                <Eye className="mr-2 h-4 w-4" />
                View Cities
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/search">
                <Eye className="mr-2 h-4 w-4" />
                Browse All
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
