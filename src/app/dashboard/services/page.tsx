"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Briefcase,
    Save,
    X,
    Upload,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import type { BusinessService } from "@/types/enterprise";
import { formatCurrency } from "@/lib/format";

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const { myBusinesses, myLoading, fetchMyBusinesses, fetchServices, deleteService, updateService, uploadMedia } = useBusinessesStore();
    const [services, setServices] = useState<BusinessService[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingService, setEditingService] = useState<BusinessService | null>(null);
    const [editForm, setEditForm] = useState({ title: "", description: "", price: "" });
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
            fetchServices(business.id).then((s) => {
                setServices(s);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [business?.id, fetchServices]);

    const handleDelete = async (serviceId: string) => {
        if (!business || !confirm("Are you sure you want to delete this service?")) return;
        try {
            await deleteService(business.id, serviceId);
            setServices((prev) => prev.filter((s) => s.id !== serviceId));
        } catch (err) {
            setError((err as Error).message || "Failed to delete service");
        }
    };

    const startEdit = (service: BusinessService) => {
        setEditingService(service);
        setEditForm({
            title: service.title,
            description: service.description ?? "",
            price: service.price != null ? String(service.price) : "",
        });
        setEditImageFile(null);
        setEditImagePreview(service.imageUrl || null);
    };

    const handleSaveEdit = async () => {
        if (!business || !editingService || !editForm.title.trim()) return;
        setSaving(true);
        setError(null);
        try {
            let imageUrl = editingService.imageUrl;
            if (editImageFile) {
                const media = await uploadMedia(business.id, editImageFile, "image");
                imageUrl = media.mediaUrl;
            }
            const updated = await updateService(business.id, editingService.id, {
                title: editForm.title,
                description: editForm.description || undefined,
                price: editForm.price ? Number(editForm.price) : undefined,
                imageUrl: imageUrl || undefined,
            });
            setServices((prev) => prev.map((s) => (s.id === editingService.id ? updated : s)));
            setEditingService(null);
        } catch (err) {
            setError((err as Error).message || "Failed to update service");
        } finally {
            setSaving(false);
        }
    };

    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (myLoading || loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Services
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your service offerings ({services.length} total)
                    </p>
                </div>
                <Link href="/dashboard/services/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search services..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {filteredServices.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Briefcase className="h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-gray-500 dark:text-gray-400">No services found</p>
                        <Link href="/dashboard/services/new" className="mt-4">
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Your First Service
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map((service) => (
                        <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            {service.imageUrl ? (
                                <img src={service.imageUrl} alt={service.title} className="aspect-video w-full object-cover" />
                            ) : (
                                <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                                    <Briefcase className="h-10 w-10 text-gray-400" />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg">{service.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {service.description || "No description"}
                                </p>
                                <div className="space-y-2">
                                    {service.price != null && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">Price:</span>
                                            <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                                {formatCurrency(service.price)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1" onClick={() => startEdit(service)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDelete(service.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Edit Service Modal */}
            {editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Edit Service</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                    <Input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                    <Input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                                    <Input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
                                </div>
                                {/* Image Upload */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Service Image</label>
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
                                            <img src={editImagePreview} alt="Service" className="aspect-video w-full rounded-lg object-cover" />
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
                                <Button variant="outline" onClick={() => setEditingService(null)}>
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel
                                </Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSaveEdit} disabled={saving || !editForm.title.trim()}>
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
