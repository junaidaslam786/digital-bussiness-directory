"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cities } from "@/data/cities.mock";
import { enterprises } from "@/data/enterprises.mock";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    MapPin,
    Building2,
    Users,
} from "lucide-react";
import { useState } from "react";

export default function CitiesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Get business count for each city
    const citiesWithCount = cities.map((city) => ({
        ...city,
        businessCount: enterprises.filter((e) => e.address.city === city.name).length,
    }));

    // Filter cities
    const filteredCities = citiesWithCount.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (city.region && city.region.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Cities
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage cities in your directory
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add City
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search cities..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Cities
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {filteredCities.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Businesses
                        </div>
                        <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {enterprises.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Avg per City
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {Math.round(enterprises.length / cities.length)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Cities Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        City
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Region
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Businesses
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {filteredCities.map((city) => (
                                    <tr
                                        key={city.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                                    <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {city.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="text-sm text-gray-900 dark:text-gray-100">
                                                {city.region || "N/A"}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center">
                                                <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {city.businessCount}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                </Button>
                                            </div>
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
