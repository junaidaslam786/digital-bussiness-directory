"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { enterprises } from "@/data/enterprises.mock";
import {
    Building2,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CheckCircle2,
    Grid3x3,
    List,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BusinessesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    // Filter businesses based on search
    const filteredEnterprises = enterprises.filter(
        (enterprise) =>
            enterprise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            enterprise.categories.some((cat) =>
                cat.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            enterprise.address.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Businesses
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage all businesses in your directory
                    </p>
                </div>
                <Link href="/claim">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Business
                    </Button>
                </Link>
            </div>

            {/* Filters & Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search businesses..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filters
                            </Button>
                            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 ${viewMode === "list"
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <List className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 ${viewMode === "grid"
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <Grid3x3 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {filteredEnterprises.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Verified</div>
                        <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {filteredEnterprises.filter((e) => e.verified).length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Pending</div>
                        <div className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {filteredEnterprises.filter((e) => !e.verified).length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Avg Rating</div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {(
                                filteredEnterprises.reduce((sum, e) => sum + e.ratingAvg, 0) /
                                filteredEnterprises.length
                            ).toFixed(1)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Business List/Grid */}
            {viewMode === "list" ? (
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Business
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Location
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Rating
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {filteredEnterprises.map((enterprise) => (
                                        <tr
                                            key={enterprise.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                                        >
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center">
                                                    <Building2 className="mr-3 h-5 w-5 text-gray-400" />
                                                    <div>
                                                        <Link
                                                            href={`/enterprises/${enterprise.slug}`}
                                                            className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                                                        >
                                                            {enterprise.name}
                                                        </Link>
                                                        <div className="text-sm text-gray-500">
                                                            {enterprise.shortDescription}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="text-sm text-gray-900 dark:text-gray-100">
                                                    {enterprise.categories[0].name}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="text-sm text-gray-900 dark:text-gray-100">
                                                    {enterprise.address.city}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {enterprise.ratingAvg.toFixed(1)}
                                                    </span>
                                                    <span className="ml-1 text-sm text-gray-500">
                                                        ({enterprise.ratingCount})
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {enterprise.verified ? (
                                                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                                        Verified
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                                        Pending
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/enterprises/${enterprise.slug}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
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
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredEnterprises.map((enterprise) => (
                        <Card key={enterprise.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">
                                            <Link
                                                href={`/enterprises/${enterprise.slug}`}
                                                className="hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {enterprise.name}
                                            </Link>
                                        </CardTitle>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {enterprise.categories[0].name}
                                        </p>
                                    </div>
                                    {enterprise.verified && (
                                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {enterprise.shortDescription}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {enterprise.ratingAvg.toFixed(1)} ★
                                        </span>
                                        <span className="ml-1 text-gray-500">
                                            ({enterprise.ratingCount})
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Link href={`/enterprises/${enterprise.slug}`}>
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
