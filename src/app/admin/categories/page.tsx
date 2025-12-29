"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { categories } from "@/data/categories.mock";
import { enterprises } from "@/data/enterprises.mock";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    FolderTree,
    Building2,
} from "lucide-react";
import { useState } from "react";

export default function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Get business count for each category
    const categoriesWithCount = categories.map((category) => ({
        ...category,
        businessCount: enterprises.filter((e) =>
            e.categories.some((c) => c.id === category.id)
        ).length,
    }));

    // Filter categories
    const filteredCategories = categoriesWithCount.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Categories
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage business categories
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search categories..."
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
                            Total Categories
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {filteredCategories.length}
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
                            Avg per Category
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {Math.round(enterprises.length / categories.length)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Categories Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((category) => (
                    <Card
                        key={category.id}
                        className="hover:shadow-lg transition-all hover:scale-105"
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                        <FolderTree className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <CardTitle className="text-lg">{category.name}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Building2 className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {category.businessCount} businesses
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
