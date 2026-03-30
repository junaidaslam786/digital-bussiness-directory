"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { Settings as SettingsIcon, Eye, Save, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import { useAuthStore } from "@/store/auth.store";

export default function SettingsPage() {
    const { myBusinesses, myLoading, fetchMyBusinesses, updateBusiness, activateBusiness, deactivateBusiness } = useBusinessesStore();
    const { changePassword } = useAuthStore();
    const [saving, setSaving] = useState(false);
    const [pwSaving, setPwSaving] = useState(false);
    const [pwMsg, setPwMsg] = useState("");

    const business = myBusinesses[0];

    const [displayName, setDisplayName] = useState("");
    const [passwords, setPasswords] = useState({ current: "", newPw: "", confirm: "" });

    useEffect(() => {
        fetchMyBusinesses();
    }, [fetchMyBusinesses]);

    useEffect(() => {
        if (business) {
            setDisplayName(business.name);
        }
    }, [business]);

    const handleSaveName = async () => {
        if (!business) return;
        setSaving(true);
        try {
            await updateBusiness(business.id, { name: displayName });
            await fetchMyBusinesses();
        } catch { /* handled */ }
        finally { setSaving(false); }
    };

    const handleToggleVisibility = async () => {
        if (!business) return;
        if (business.isActive) {
            await deactivateBusiness(business.id);
        } else {
            await activateBusiness(business.id);
        }
        await fetchMyBusinesses();
    };

    const handleChangePassword = async () => {
        setPwMsg("");
        if (passwords.newPw !== passwords.confirm) {
            setPwMsg("Passwords do not match");
            return;
        }
        if (passwords.newPw.length < 6) {
            setPwMsg("Password must be at least 6 characters");
            return;
        }
        setPwSaving(true);
        try {
            await changePassword({ currentPassword: passwords.current, newPassword: passwords.newPw });
            setPwMsg("Password changed successfully");
            setPasswords({ current: "", newPw: "", confirm: "" });
        } catch {
            setPwMsg("Failed to change password");
        } finally {
            setPwSaving(false);
        }
    };

    if (myLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-32 w-full rounded-lg" />
            </div>
        );
    }

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
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleSaveName}
                            disabled={saving || displayName === business?.name}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {saving ? "Saving..." : "Save Name"}
                        </Button>
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
                            onClick={handleToggleVisibility}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${business?.isActive
                                    ? "bg-emerald-600"
                                    : "bg-gray-200 dark:bg-gray-700"
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${business?.isActive ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <Key className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Change Password</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 max-w-md">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Current Password
                            </label>
                            <Input
                                type="password"
                                value={passwords.current}
                                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                New Password
                            </label>
                            <Input
                                type="password"
                                value={passwords.newPw}
                                onChange={(e) => setPasswords({ ...passwords, newPw: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirm New Password
                            </label>
                            <Input
                                type="password"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            />
                        </div>
                        {pwMsg && (
                            <p className={`text-sm ${pwMsg.includes("success") ? "text-emerald-600" : "text-red-600"}`}>
                                {pwMsg}
                            </p>
                        )}
                        <Button
                            onClick={handleChangePassword}
                            disabled={pwSaving || !passwords.current || !passwords.newPw}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {pwSaving ? "Changing..." : "Change Password"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
