"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
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
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    // Mock business data
    const [businessData, setBusinessData] = useState({
        name: "Seoul Tech Solutions",
        description: "Leading technology solutions provider in Seoul, specializing in software development, IT consulting, and digital transformation.",
        category: "IT Services",
        phone: "+82 2-1234-5678",
        email: "contact@seoultechsolutions.kr",
        website: "https://seoultechsolutions.kr",
        address: {
            street: "123 Gangnam-daero",
            city: "Seoul",
            district: "Gangnam-gu",
            postalCode: "06234",
        },
        verified: true,
    });

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
                            onClick={() => setIsEditing(false)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                        <Button
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    </div>
                )}
            </div>

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
                                {businessData.verified && (
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
                                            value={businessData.name}
                                            onChange={(e) =>
                                                setBusinessData({ ...businessData, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{businessData.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Category
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="text"
                                            value={businessData.category}
                                            onChange={(e) =>
                                                setBusinessData({ ...businessData, category: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{businessData.category}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Description
                                    </label>
                                    {isEditing ? (
                                        <Textarea
                                            value={businessData.description}
                                            onChange={(e) =>
                                                setBusinessData({ ...businessData, description: e.target.value })
                                            }
                                            rows={4}
                                        />
                                    ) : (
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {businessData.description}
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
                                            value={businessData.phone}
                                            onChange={(e) =>
                                                setBusinessData({ ...businessData, phone: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{businessData.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="email"
                                            value={businessData.email}
                                            onChange={(e) =>
                                                setBusinessData({ ...businessData, email: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">{businessData.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Website
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="url"
                                            value={businessData.website}
                                            onChange={(e) =>
                                                setBusinessData({ ...businessData, website: e.target.value })
                                            }
                                        />
                                    ) : (
                                        <a
                                            href={businessData.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                                        >
                                            {businessData.website}
                                        </a>
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
                                        Street Address
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="text"
                                            value={businessData.address.street}
                                            onChange={(e) =>
                                                setBusinessData({
                                                    ...businessData,
                                                    address: { ...businessData.address, street: e.target.value },
                                                })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">
                                            {businessData.address.street}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            City
                                        </label>
                                        {isEditing ? (
                                            <Input
                                                type="text"
                                                value={businessData.address.city}
                                                onChange={(e) =>
                                                    setBusinessData({
                                                        ...businessData,
                                                        address: { ...businessData.address, city: e.target.value },
                                                    })
                                                }
                                            />
                                        ) : (
                                            <p className="text-gray-900 dark:text-white">
                                                {businessData.address.city}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            District
                                        </label>
                                        {isEditing ? (
                                            <Input
                                                type="text"
                                                value={businessData.address.district}
                                                onChange={(e) =>
                                                    setBusinessData({
                                                        ...businessData,
                                                        address: { ...businessData.address, district: e.target.value },
                                                    })
                                                }
                                            />
                                        ) : (
                                            <p className="text-gray-900 dark:text-white">
                                                {businessData.address.district}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Postal Code
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="text"
                                            value={businessData.address.postalCode}
                                            onChange={(e) =>
                                                setBusinessData({
                                                    ...businessData,
                                                    address: { ...businessData.address, postalCode: e.target.value },
                                                })
                                            }
                                        />
                                    ) : (
                                        <p className="text-gray-900 dark:text-white">
                                            {businessData.address.postalCode}
                                        </p>
                                    )}
                                </div>
                            </div>
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
                                        Profile Views
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        1,247
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Last Updated
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        2 days ago
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Member Since
                                    </span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        Jan 2024
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
                                <Button variant="outline" className="w-full justify-start" size="sm">
                                    <Globe className="mr-2 h-4 w-4" />
                                    View Public Profile
                                </Button>
                                <Button variant="outline" className="w-full justify-start" size="sm">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Edit Business Hours
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
