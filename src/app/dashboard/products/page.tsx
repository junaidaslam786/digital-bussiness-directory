"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Package,
    Grid3x3,
    List,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Mock products data
    const products = [
        {
            id: "1",
            name: "Enterprise Software Solution",
            sku: "ESS-001",
            price: "From ₩5,000,000",
            stock: "In Stock",
            image: "/api/placeholder/400/300",
        },
        {
            id: "2",
            name: "Cloud Infrastructure Setup",
            sku: "CIS-002",
            price: "From ₩3,500,000",
            stock: "In Stock",
            image: "/api/placeholder/400/300",
        },
        {
            id: "3",
            name: "Custom Mobile App Development",
            sku: "CMA-003",
            price: "From ₩8,000,000",
            stock: "Made to Order",
            image: "/api/placeholder/400/300",
        },
        {
            id: "4",
            name: "IT Security Solutions",
            sku: "ITS-004",
            price: "From ₩2,500,000",
            stock: "In Stock",
            image: "/api/placeholder/400/300",
        },
    ];

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Products
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your product listings
                    </p>
                </div>
                <Link href="/dashboard/products/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Search & View Toggle */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 ${viewMode === "grid"
                                        ? "bg-emerald-600 text-white"
                                        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <Grid3x3 className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 ${viewMode === "list"
                                        ? "bg-emerald-600 text-white"
                                        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <List className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Products
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {filteredProducts.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">In Stock</div>
                        <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {filteredProducts.filter((p) => p.stock === "In Stock").length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Made to Order
                        </div>
                        <div className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {filteredProducts.filter((p) => p.stock === "Made to Order").length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Products Grid/List */}
            {viewMode === "grid" ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="overflow-hidden hover:shadow-lg transition-all"
                        >
                            <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
                            <CardContent className="p-4">
                                <div className="mb-2 flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            SKU: {product.sku}
                                        </p>
                                    </div>
                                    <Badge
                                        className={
                                            product.stock === "In Stock"
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                        }
                                    >
                                        {product.stock}
                                    </Badge>
                                </div>
                                <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                                    {product.price}
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <Link href={`/dashboard/products/${product.id}/edit`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm">
                                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Product
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            SKU
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Stock
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {filteredProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                                        >
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center">
                                                    <Package className="mr-3 h-5 w-5 text-gray-400" />
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {product.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {product.sku}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-emerald-600 dark:text-emerald-400">
                                                {product.price}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Badge
                                                    className={
                                                        product.stock === "In Stock"
                                                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                                    }
                                                >
                                                    {product.stock}
                                                </Badge>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/dashboard/products/${product.id}/edit`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
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
            )}
        </div>
    );
}
