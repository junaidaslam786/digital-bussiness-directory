"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Images, Plus, Trash2, AlertCircle, CheckCircle2, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import type { BusinessMedia } from "@/types/enterprise";

export default function GalleryPage() {
    const { myBusinesses, myLoading, fetchMyBusinesses, fetchMedia, uploadMedia, deleteMedia } = useBusinessesStore();
    const [media, setMedia] = useState<BusinessMedia[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const business = myBusinesses[0];

    useEffect(() => {
        fetchMyBusinesses();
    }, [fetchMyBusinesses]);

    useEffect(() => {
        if (business?.id) {
            setLoading(true);
            fetchMedia(business.id).then((m) => {
                setMedia(m);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [business?.id, fetchMedia]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || !business) return;
        setUploading(true);
        setMessage(null);
        try {
            for (const file of Array.from(files)) {
                const uploaded = await uploadMedia(business.id, file, "image");
                setMedia((prev) => [...prev, uploaded]);
            }
            setMessage({ type: "success", text: `${files.length} image(s) uploaded successfully!` });
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to upload image(s)" });
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (mediaId: string) => {
        if (!business || !confirm("Delete this image?")) return;
        try {
            await deleteMedia(business.id, mediaId);
            setMedia((prev) => prev.filter((m) => m.id !== mediaId));
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to delete image" });
        }
    };

    if (myLoading || loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Gallery
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your business images ({media.length} images)
                    </p>
                </div>
                <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-emerald-600 hover:bg-emerald-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {uploading ? "Uploading..." : "Upload Images"}
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleUpload}
                />
            </div>

            {message && (
                <div className={`flex items-center gap-2 rounded-lg p-3 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"}`}>
                    {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {message.text}
                    <button onClick={() => setMessage(null)} className="ml-auto"><X className="h-3 w-3" /></button>
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Images className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Image Gallery</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className="mb-6 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700 cursor-pointer hover:border-emerald-400 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Images className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Click to upload images or drag and drop
                        </p>
                    </div>

                    {media.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                            No images uploaded yet
                        </p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {media.map((item) => (
                                <Card key={item.id} className="overflow-hidden group relative">
                                    <img
                                        src={item.mediaUrl}
                                        alt="Business gallery"
                                        className="aspect-square w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-all flex items-center justify-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-white"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
