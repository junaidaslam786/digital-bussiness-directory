"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Images, Plus, Trash2 } from "lucide-react";

export default function GalleryPage() {
    const images = [
        { id: "1", url: "/api/placeholder/400/300", alt: "Office" },
        { id: "2", url: "/api/placeholder/400/300", alt: "Team" },
        { id: "3", url: "/api/placeholder/400/300", alt: "Products" },
        { id: "4", url: "/api/placeholder/400/300", alt: "Workspace" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Gallery
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your business images
                    </p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Images
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Images className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Image Gallery ({images.length} images)</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                        <Images className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Drag and drop images here, or click to browse
                        </p>
                        <Button variant="outline" className="mt-4">
                            Select Files
                        </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {images.map((image) => (
                            <Card key={image.id} className="overflow-hidden group relative">
                                <div className="aspect-square bg-gray-200 dark:bg-gray-800" />
                                <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <Button variant="outline" size="sm" className="bg-white">
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
