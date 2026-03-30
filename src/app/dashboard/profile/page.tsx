"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Skeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";
import {
    Building2,
    Mail,
    Phone,
    Globe,
    MapPin,
    Clock,
    Edit,
    Save,
    X,
    CheckCircle2,
    Camera,
    Plus,
    Trash2,
    AlertCircle,
    Share2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useBusinessesStore } from "@/store/businesses.api";
import { useCategoriesStore } from "@/store/categories.api";
import { useLocationsStore } from "@/store/locations.api";
import { formatRelativeTime } from "@/lib/format";
import type { BusinessSocial } from "@/types/enterprise";

export default function ProfilePage() {
    const { myBusinesses, myLoading, fetchMyBusinesses, updateBusiness, uploadLogo, fetchSocials, createSocial, updateSocial, deleteSocial } = useBusinessesStore();
    const { categories, fetchCategories } = useCategoriesStore();
    const { cities, fetchCities } = useLocationsStore();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [logoUploading, setLogoUploading] = useState(false);
    const logoInputRef = useRef<HTMLInputElement>(null);

    // Social links state
    const [socials, setSocials] = useState<BusinessSocial[]>([]);
    const [socialsLoading, setSocialsLoading] = useState(false);
    const [showSocialForm, setShowSocialForm] = useState(false);
    const [socialForm, setSocialForm] = useState({ type: "facebook", url: "" });
    const [socialSaving, setSocialSaving] = useState(false);

    const business = myBusinesses[0];

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        categoryId: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        cityId: "",
        countryId: "",
    });

    useEffect(() => {
        fetchMyBusinesses();
        fetchCategories();
        fetchCities();
    }, [fetchMyBusinesses, fetchCategories, fetchCities]);

    useEffect(() => {
        if (business) {
            setFormData({
                name: business.name || "",
                description: business.description || "",
                categoryId: business.categoryId || "",
                phone: business.phone || "",
                email: business.email || "",
                website: business.website || "",
                address: business.address || "",
                cityId: business.cityId || "",
                countryId: business.countryId || "",
            });
            // Load social links
            setSocialsLoading(true);
            fetchSocials(business.id)
                .then((s) => setSocials(s))
                .catch(() => {})
                .finally(() => setSocialsLoading(false));
        }
    }, [business, fetchSocials]);

    const handleSave = async () => {
        if (!business) return;
        setSaving(true);
        setMessage(null);
        try {
            await updateBusiness(business.id, formData);
            await fetchMyBusinesses();
            setIsEditing(false);
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to update profile" });
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (business) {
            setFormData({
                name: business.name || "",
                description: business.description || "",
                categoryId: business.categoryId || "",
                phone: business.phone || "",
                email: business.email || "",
                website: business.website || "",
                address: business.address || "",
                cityId: business.cityId || "",
                countryId: business.countryId || "",
            });
        }
        setIsEditing(false);
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !business) return;
        setLogoUploading(true);
        setMessage(null);
        try {
            await uploadLogo(business.id, file);
            await fetchMyBusinesses();
            setMessage({ type: "success", text: "Logo updated successfully!" });
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to upload logo" });
        } finally {
            setLogoUploading(false);
            if (logoInputRef.current) logoInputRef.current.value = "";
        }
    };

    const handleAddSocial = async () => {
        if (!business || !socialForm.url.trim()) return;
        setSocialSaving(true);
        setMessage(null);
        try {
            const created = await createSocial(business.id, { type: socialForm.type, url: socialForm.url });
            setSocials((prev) => [...prev, created]);
            setSocialForm({ type: "facebook", url: "" });
            setShowSocialForm(false);
            setMessage({ type: "success", text: "Social link added!" });
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to add social link" });
        } finally {
            setSocialSaving(false);
        }
    };

    const handleDeleteSocial = async (socialId: string) => {
        if (!business || !confirm("Delete this social link?")) return;
        try {
            await deleteSocial(business.id, socialId);
            setSocials((prev) => prev.filter((s) => s.id !== socialId));
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to delete social link" });
        }
    };

    if (myLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <Skeleton className="h-64 w-full rounded-lg" />
                        <Skeleton className="h-48 w-full rounded-lg" />
                    </div>
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>
            </div>
        );
    }

    const categoryName = categories.find((c) => c.id === business?.categoryId)?.name || "Not set";
    const cityName = cities.find((c) => c.id === business?.cityId)?.name || "Not set";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Business Profile
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your business information
                    </p>
                </div>
                {!isEditing ? (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button onClick={handleCancel} variant="outline">
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    </div>
                )}
            </div>

            {/* Message Banner */}
            {message && (
                <div className={`flex items-center gap-2 rounded-lg p-3 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"}`}>
                    {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {message.text}
                    <button onClick={() => setMessage(null)} className="ml-auto"><X className="h-3 w-3" /></button>
                </div>
            )}

            {/* Logo Upload */}
            {business && (
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                    {business.logoUrl ? (
                                        <img src={business.logoUrl} alt={business.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <Building2 className="h-10 w-10 text-gray-400" />
                                    )}
                                </div>
                                <button
                                    onClick={() => logoInputRef.current?.click()}
                                    disabled={logoUploading}
                                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{business.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {logoUploading ? "Uploading logo..." : "Click the camera icon to change logo"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Profile Info */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    <span>Basic Information</span>
                                </CardTitle>
                                {business?.isApproved && (
                                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                        Verified
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Business Name
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{business?.name || "Not set"}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Category
                                    </label>
                                    {isEditing ? (
                                        <select
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                            value={formData.categoryId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, categoryId: e.target.value })
                                            }
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{categoryName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </label>
                                    {isEditing ? (
                                        <Textarea
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({ ...formData, description: e.target.value })
                                            }
                                            rows={4}
                                        />
                                    ) : (
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {business?.description || "No description"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-lg">
                                <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span>Contact Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{business?.phone || "Not set"}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{business?.email || "Not set"}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Website
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) =>
                                                setFormData({ ...formData, website: e.target.value })
                                            }
                                        />
                                    ) : business?.website ? (
                                        <a
                                            href={business.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                                        >
                                            {business.website}
                                        </a>
                                    ) : (
                                        <p className="text-gray-500">Not set</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-lg">
                                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span>Location</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Address
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) =>
                                                setFormData({ ...formData, address: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">
                                            {business?.address || "Not set"}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        City
                                    </label>
                                    {isEditing ? (
                                        <select
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                            value={formData.cityId}
                                            onChange={(e) =>
                                                setFormData({ ...formData, cityId: e.target.value })
                                            }
                                        >
                                            <option value="">Select city</option>
                                            {cities.map((city) => (
                                                <option key={city.id} value={city.id}>{city.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{cityName}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Media Links */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <Share2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    <span>Social Media Links</span>
                                </CardTitle>
                                <Button size="sm" variant="outline" onClick={() => setShowSocialForm(!showSocialForm)}>
                                    <Plus className="mr-1 h-3 w-3" />
                                    Add
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {showSocialForm && (
                                <div className="mb-4 space-y-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <select
                                            className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                            value={socialForm.type}
                                            onChange={(e) => setSocialForm({ ...socialForm, type: e.target.value })}
                                        >
                                            <option value="facebook">Facebook</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="youtube">YouTube</option>
                                            <option value="x">X (Twitter)</option>
                                            <option value="kakao">KakaoTalk</option>
                                            <option value="tiktok">TikTok</option>
                                            <option value="whatsapp">WhatsApp</option>
                                        </select>
                                        <Input
                                            className="sm:col-span-2"
                                            placeholder="https://..."
                                            value={socialForm.url}
                                            onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={handleAddSocial} disabled={socialSaving} className="bg-emerald-600 hover:bg-emerald-700">
                                            {socialSaving ? "Adding..." : "Add Link"}
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => setShowSocialForm(false)}>Cancel</Button>
                                    </div>
                                </div>
                            )}
                            {socialsLoading ? (
                                <Skeleton className="h-12 w-full" />
                            ) : socials.length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400">No social links added yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {socials.map((social) => (
                                        <div key={social.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 capitalize">
                                                    {social.type}
                                                </Badge>
                                                <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline dark:text-emerald-400 truncate max-w-[200px]">
                                                    {social.url}
                                                </a>
                                            </div>
                                            <Button size="sm" variant="ghost" onClick={() => handleDeleteSocial(social.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Profile Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Profile Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Status
                                    </span>
                                    <Badge className={business?.isActive
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                    }>
                                        {business?.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Last Updated
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {business?.updatedAt ? formatRelativeTime(business.updatedAt) : "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Member Since
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {business?.createdAt
                                            ? new Date(business.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {business && (
                                    <Link href={`/enterprises/${business.id}`}>
                                        <Button variant="outline" className="w-full justify-start" size="sm">
                                            <Globe className="mr-2 h-4 w-4" />
                                            View Public Profile
                                        </Button>
                                    </Link>
                                )}
                                <Link href="/dashboard/services">
                                    <Button variant="outline" className="w-full justify-start" size="sm">
                                        <Clock className="mr-2 h-4 w-4" />
                                        Manage Services
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
