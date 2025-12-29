"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Settings as SettingsIcon, Bell, Eye, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        businessName: "Seoul Tech Solutions",
        visibility: true,
        emailNotifications: true,
        reviewNotifications: true,
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your business settings and preferences
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <SettingsIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>General Settings</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Business Display Name
                            </label>
                            <Input
                                type="text"
                                value={settings.businessName}
                                onChange={(e) =>
                                    setSettings({ ...settings, businessName: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Visibility</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                Public Visibility
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Make your business visible in search results
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                setSettings({
                                    ...settings,
                                    visibility: !settings.visibility,
                                })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.visibility
                                    ? "bg-emerald-600"
                                    : "bg-gray-200 dark:bg-gray-700"
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.visibility ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Bell className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
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
                                    Receive email updates about your business
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
                                        ? "bg-emerald-600"
                                        : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Review Notifications
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Get notified when you receive new reviews
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setSettings({
                                        ...settings,
                                        reviewNotifications: !settings.reviewNotifications,
                                    })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.reviewNotifications
                                        ? "bg-emerald-600"
                                        : "bg-gray-200 dark:bg-gray-700"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.reviewNotifications ? "translate-x-6" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
