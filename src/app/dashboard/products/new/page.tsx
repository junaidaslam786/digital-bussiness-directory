"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Package, Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewProductPage() {
    const [productData, setProductData] = useState({
        name: "",
        sku: "",
        description: "",
        priceFrom: "",
        priceTo: "",
        stock: "In Stock",
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Add New Product
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Create a new product listing
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Save className="mr-2 h-4 w-4" />
                        Save Product
                    </Button>
                    <Link href="/dashboard/products">
                        <Button variant="outline">
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Form */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-lg">
                                <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span>Product Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Product Name *
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter product name"
                                        value={productData.name}
                                        onChange={(e) =>
                                            setProductData({ ...productData, name: e.target.value })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        SKU / Product Code
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="e.g., PRD-001"
                                        value={productData.sku}
                                        onChange={(e) =>
                                            setProductData({ ...productData, sku: e.target.value })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description *
                                    </label>
                                    <Textarea
                                        placeholder="Describe your product..."
                                        rows={5}
                                        value={productData.description}
                                        onChange={(e) =>
                                            setProductData({ ...productData, description: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Price From (₩)
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={productData.priceFrom}
                                            onChange={(e) =>
                                                setProductData({ ...productData, priceFrom: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Price To (₩) - Optional
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={productData.priceTo}
                                            onChange={(e) =>
                                                setProductData({ ...productData, priceTo: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Stock Status
                                    </label>
                                    <select
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:border-gray-700 dark:bg-gray-950"
                                        value={productData.stock}
                                        onChange={(e) =>
                                            setProductData({ ...productData, stock: e.target.value })
                                        }
                                    >
                                        <option>In Stock</option>
                                        <option>Out of Stock</option>
                                        <option>Made to Order</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Product Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                                    <div className="text-center">
                                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Click to upload images
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                    Upload Images
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
