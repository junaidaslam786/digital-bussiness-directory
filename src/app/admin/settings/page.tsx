"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    Settings as SettingsIcon,
    Globe,
    Bell,
    Shield,
    Palette,
    Mail,
    Save,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        siteName: "KoreaBiz Directory",
        siteDescription: "South Korea Business Directory",
        emailNotifications: true,
        reviewModeration: true,
        darkMode: false,
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your directory settings
                </p>
            </div>

            {/* General Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span>General Settings</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Site Name
                            </label>
                            <Input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) =>
                                    setSettings({ ...settings, siteName: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Site Description
                            </label>
                            <Input
                                type="text"
                                value={settings.siteDescription}
                                onChange={(e) =>
                                    setSettings({ ...settings, siteDescription: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span>Notifications</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Email Notifications
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Receive email updates about new businesses and reviews
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setSettings({
                                        ...settings,
                                        emailNotifications: !settings.emailNotifications,
                                    })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.emailNotifications
                                        ? "bg-blue-600"
                                        : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Moderation Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span>Moderation</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Review Moderation
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Require approval before reviews are published
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setSettings({
                                        ...settings,
                                        reviewModeration: !settings.reviewModeration,
                                    })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.reviewModeration
                                        ? "bg-blue-600"
                                        : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.reviewModeration ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Palette className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span>Appearance</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Dark Mode
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Use dark theme for the admin panel
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setSettings({
                                        ...settings,
                                        darkMode: !settings.darkMode,
                                    })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.darkMode
                                        ? "bg-blue-600"
                                        : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.darkMode ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <p className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                Color Scheme
                            </p>
                            <div className="grid grid-cols-5 gap-3">
                                <button className="group flex flex-col items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-600 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-900" />
                                    <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                        Blue
                                    </span>
                                </button>
                                <button className="group flex flex-col items-center opacity-50 hover:opacity-100">
                                    <div className="h-10 w-10 rounded-full bg-emerald-600" />
                                    <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                        Green
                                    </span>
                                </button>
                                <button className="group flex flex-col items-center opacity-50 hover:opacity-100">
                                    <div className="h-10 w-10 rounded-full bg-purple-600" />
                                    <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                        Purple
                                    </span>
                                </button>
                                <button className="group flex flex-col items-center opacity-50 hover:opacity-100">
                                    <div className="h-10 w-10 rounded-full bg-orange-600" />
                                    <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                        Orange
                                    </span>
                                </button>
                                <button className="group flex flex-col items-center opacity-50 hover:opacity-100">
                                    <div className="h-10 w-10 rounded-full bg-pink-600" />
                                    <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                        Pink
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
