"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { enterprises } from "@/data/enterprises.mock";
import { categories } from "@/data/categories.mock";
import { cities } from "@/data/cities.mock";
import { reviews } from "@/data/reviews.mock";
import {
    BarChart3,
    TrendingUp,
    Users,
    Eye,
    MapPin,
    Star,
    Building2,
} from "lucide-react";

export default function AnalyticsPage() {
    // Calculate analytics data
    const totalViews = enterprises.reduce((sum, e) => sum + (e.ratingCount * 10), 0);
    const totalRatings = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    // Category distribution
    const categoryDistribution = categories.map((category) => ({
        name: category.name,
        count: enterprises.filter((e) =>
            e.categories.some((c) => c.id === category.id)
        ).length,
    })).sort((a, b) => b.count - a.count);

    // City distribution
    const cityDistribution = cities.map((city) => ({
        name: city.name,
        count: enterprises.filter((e) => e.address.city === city.name).length,
    })).sort((a, b) => b.count - a.count).slice(0, 5);

    // Top businesses
    const topBusinesses = [...enterprises]
        .sort((a, b) => b.ratingAvg - a.ratingAvg)
        .slice(0, 10);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Analytics
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Directory performance and insights
                </p>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Views
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {totalViews.toLocaleString()}
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                    ↑ 15.3% from last month
                                </p>
                            </div>
                            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                                <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Avg Rating
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {totalRatings.toFixed(1)}
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                    ↑ 0.3 from last month
                                </p>
                            </div>
                            <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
                                <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Active Businesses
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {enterprises.length}
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                    ↑ 12 new this month
                                </p>
                            </div>
                            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
                                <Building2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
                                    {reviews.length}
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                    ↑ 23 new this month
                                </p>
                            </div>
                            <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
                                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Category & City Distribution */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-lg">
                            <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span>Top Categories</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {categoryDistribution.slice(0, 8).map((category, index) => {
                                const maxCount = categoryDistribution[0].count;
                                const percentage = (category.count / maxCount) * 100;

                                return (
                                    <div key={index}>
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {category.name}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {category.count}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2 rounded-full bg-blue-600 dark:bg-blue-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Cities */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-lg">
                            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <span>Top Cities</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {cityDistribution.map((city, index) => {
                                const maxCount = cityDistribution[0].count;
                                const percentage = (city.count / maxCount) * 100;

                                return (
                                    <div key={index}>
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                {city.name}
                                            </span>
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {city.count}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2 rounded-full bg-emerald-600 dark:bg-emerald-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Performing Businesses */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span>Top Performing Businesses</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Rank
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Business
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Category
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Rating
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Reviews
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {topBusinesses.map((business, index) => (
                                    <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                        <td className="whitespace-nowrap px-4 py-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {business.name}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                            {business.categories[0].name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            <div className="flex items-center">
                                                <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {business.ratingAvg.toFixed(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                            {business.ratingCount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
