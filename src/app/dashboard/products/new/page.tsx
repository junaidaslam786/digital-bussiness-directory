"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Package, Save, X, AlertCircle, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useBusinessesStore } from "@/store/businesses.api";

export default function NewProductPage() {
    const router = useRouter();
    const { myBusinesses, fetchMyBusinesses, uploadMedia } = useBusinessesStore();
    const createProduct = useBusinessesStore((s) => s.createProduct);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const business = myBusinesses[0];

    const [productData, setProductData] = useState({
        name: "",
        sku: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        fetchMyBusinesses();
    }, [fetchMyBusinesses]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImageFile(null);
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
    };

    const handleSave = async () => {
        if (!business || !productData.name.trim()) return;
        setSaving(true);
        setError(null);
        try {
            let imageUrl: string | undefined;
            if (imageFile) {
                setUploading(true);
                const media = await uploadMedia(business.id, imageFile, "image");
                imageUrl = media.mediaUrl;
                setUploading(false);
            }
            await createProduct(business.id, {
                name: productData.name,
                sku: productData.sku || undefined,
                description: productData.description || undefined,
                price: productData.price ? Number(productData.price) : undefined,
                imageUrl,
            });
            router.push("/dashboard/products");
        } catch (err) {
            setError((err as Error).message || "Failed to create product");
        } finally {
            setSaving(false);
            setUploading(false);
        }
    };

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
                    <Button
                        onClick={handleSave}
                        disabled={saving || uploading || !productData.name.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {uploading ? "Uploading image..." : saving ? "Saving..." : "Save Product"}
                    </Button>
                    <Link href="/dashboard/products">
                        <Button variant="outline">
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    </Link>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            )}

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
                                        Description
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

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Price (₩)
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={productData.price}
                                        onChange={(e) =>
                                            setProductData({ ...productData, price: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Product Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                {imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Product preview"
                                            className="aspect-video w-full rounded-lg object-cover"
                                        />
                                        <button
                                            onClick={removeImage}
                                            className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white hover:bg-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="flex h-48 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-emerald-400 dark:border-gray-700 dark:hover:border-emerald-500"
                                        onClick={() => imageInputRef.current?.click()}
                                    >
                                        <div className="text-center">
                                            <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Click to upload image
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                JPEG, PNG, WebP
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {imagePreview && (
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => imageInputRef.current?.click()}
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Change Image
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
