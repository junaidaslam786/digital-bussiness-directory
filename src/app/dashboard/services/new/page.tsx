"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Briefcase, Save, X, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBusinessesStore } from "@/store/businesses.api";

export default function NewServicePage() {
    const router = useRouter();
    const { myBusinesses, fetchMyBusinesses } = useBusinessesStore();
    const createService = useBusinessesStore((s) => s.createService);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const business = myBusinesses[0];

    const [serviceData, setServiceData] = useState({
        title: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        fetchMyBusinesses();
    }, [fetchMyBusinesses]);

    const handleSave = async () => {
        if (!business || !serviceData.title.trim()) return;
        setSaving(true);
        setError(null);
        try {
            await createService(business.id, {
                title: serviceData.title,
                description: serviceData.description || undefined,
                price: serviceData.price ? Number(serviceData.price) : undefined,
            });
            router.push("/dashboard/services");
        } catch (err) {
            setError((err as Error).message || "Failed to create service");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Add New Service
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Create a new service offering
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handleSave}
                        disabled={saving || !serviceData.title.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {saving ? "Saving..." : "Save Service"}
                    </Button>
                    <Link href="/dashboard/services">
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

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Service Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 max-w-2xl">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Service Title *
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter service title"
                                value={serviceData.title}
                                onChange={(e) =>
                                    setServiceData({ ...serviceData, title: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <Textarea
                                placeholder="Describe your service..."
                                rows={5}
                                value={serviceData.description}
                                onChange={(e) =>
                                    setServiceData({ ...serviceData, description: e.target.value })
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
                                value={serviceData.price}
                                onChange={(e) =>
                                    setServiceData({ ...serviceData, price: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
