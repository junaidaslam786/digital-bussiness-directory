"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Package,
    Grid3x3,
    List,
    Save,
    X,
    Upload,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import type { BusinessProduct } from "@/types/enterprise";
import { formatCurrency } from "@/lib/format";

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const { myBusinesses, myLoading, fetchMyBusinesses, fetchProducts, deleteProduct, updateProduct, uploadMedia } = useBusinessesStore();
    const [products, setProducts] = useState<BusinessProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<BusinessProduct | null>(null);
    const [editForm, setEditForm] = useState({ name: "", description: "", price: "", sku: "" });
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const editImageRef = useRef<HTMLInputElement>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const business = myBusinesses[0];

    useEffect(() => {
        fetchMyBusinesses();
    }, [fetchMyBusinesses]);

    useEffect(() => {
        if (business?.id) {
            setLoading(true);
            fetchProducts(business.id).then((p) => {
                setProducts(p);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [business?.id, fetchProducts]);

    const handleDelete = async (productId: string) => {
        if (!business || !confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProduct(business.id, productId);
            setProducts((prev) => prev.filter((p) => p.id !== productId));
        } catch (err) {
            setError((err as Error).message || "Failed to delete product");
        }
    };

    const startEdit = (product: BusinessProduct) => {
        setEditingProduct(product);
        setEditForm({
            name: product.name,
            description: product.description ?? "",
            price: product.price != null ? String(product.price) : "",
            sku: product.sku ?? "",
        });
        setEditImageFile(null);
        setEditImagePreview(product.imageUrl || null);
    };

    const handleSaveEdit = async () => {
        if (!business || !editingProduct || !editForm.name.trim()) return;
        setSaving(true);
        setError(null);
        try {
            let imageUrl = editingProduct.imageUrl;
            if (editImageFile) {
                const media = await uploadMedia(business.id, editImageFile, "image");
                imageUrl = media.mediaUrl;
            }
            const updated = await updateProduct(business.id, editingProduct.id, {
                name: editForm.name,
                description: editForm.description || undefined,
                price: editForm.price ? Number(editForm.price) : undefined,
                sku: editForm.sku || undefined,
                imageUrl: imageUrl || undefined,
            });
            setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updated : p)));
            setEditingProduct(null);
        } catch (err) {
            setError((err as Error).message || "Failed to update product");
        } finally {
            setSaving(false);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (myLoading || loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Products
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your product listings ({products.length} total)
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
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Products
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {products.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">With Price</div>
                        <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {products.filter((p) => p.price != null).length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {filteredProducts.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Package className="h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-gray-500 dark:text-gray-400">No products found</p>
                        <Link href="/dashboard/products/new" className="mt-4">
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Your First Product
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : viewMode === "grid" ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="overflow-hidden hover:shadow-lg transition-all"
                        >
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className="aspect-video w-full object-cover" />
                            ) : (
                                <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                    <Package className="h-10 w-10 text-gray-400" />
                                </div>
                            )}
                            <CardContent className="p-4">
                                <div className="mb-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {product.name}
                                    </h3>
                                    {product.sku && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            SKU: {product.sku}
                                        </p>
                                    )}
                                </div>
                                {product.price != null && (
                                    <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                                        {formatCurrency(product.price)}
                                    </p>
                                )}
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1" onClick={() => startEdit(product)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
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
                                                {product.sku || "—"}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-emerald-600 dark:text-emerald-400">
                                                {product.price != null ? formatCurrency(product.price) : "—"}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => startEdit(product)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
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

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Edit Product</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                    <Input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                                        <Input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">SKU</label>
                                        <Input value={editForm.sku} onChange={(e) => setEditForm({ ...editForm, sku: e.target.value })} />
                                    </div>
                                </div>
                                {/* Image Upload */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Product Image</label>
                                    <input
                                        ref={editImageRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setEditImageFile(file);
                                                setEditImagePreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                    {editImagePreview ? (
                                        <div className="relative">
                                            <img src={editImagePreview} alt="Product" className="aspect-video w-full rounded-lg object-cover" />
                                            <button
                                                onClick={() => { setEditImageFile(null); setEditImagePreview(null); if (editImageRef.current) editImageRef.current.value = ""; }}
                                                className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-emerald-400 dark:border-gray-700"
                                            onClick={() => editImageRef.current?.click()}
                                        >
                                            <div className="text-center">
                                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                                <p className="mt-1 text-xs text-gray-500">Click to upload</p>
                                            </div>
                                        </div>
                                    )}
                                    {editImagePreview && (
                                        <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => editImageRef.current?.click()}>
                                            <Upload className="mr-2 h-3 w-3" />Change Image
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel
                                </Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSaveEdit} disabled={saving || !editForm.name.trim()}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {saving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
