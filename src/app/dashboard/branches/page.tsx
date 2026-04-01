"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { MapPin, Plus, Trash2, Phone, AlertCircle, CheckCircle2, X as XIcon, Edit, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import { useLocationsStore } from "@/store/locations.api";
import type { BusinessBranch } from "@/types/enterprise";

export default function BranchesPage() {
    const { myBusinesses, myLoading, fetchMyBusinesses, fetchBranches, createBranch, updateBranch, deleteBranch } = useBusinessesStore();
    const { cities, fetchCities } = useLocationsStore();
    const [branches, setBranches] = useState<BusinessBranch[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [form, setForm] = useState({ address: "", cityId: "", phone: "", operatingHours: "" });
    const [editId, setEditId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ address: "", cityId: "", phone: "", operatingHours: "" });

    const business = myBusinesses[0];

    useEffect(() => {
        fetchMyBusinesses();
        fetchCities();
    }, [fetchMyBusinesses, fetchCities]);

    useEffect(() => {
        if (business?.id) {
            setLoading(true);
            fetchBranches(business.id).then((b) => {
                setBranches(b);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [business?.id, fetchBranches]);

    const handleAdd = async () => {
        if (!business || !form.address.trim() || !form.cityId) return;
        setSaving(true);
        setMessage(null);
        try {
            const created = await createBranch(business.id, {
                address: form.address,
                cityId: form.cityId,
                phone: form.phone || undefined,
                operatingHours: form.operatingHours || undefined,
            });
            setBranches((prev) => [...prev, created]);
            setForm({ address: "", cityId: "", phone: "", operatingHours: "" });
            setShowForm(false);
            setMessage({ type: "success", text: "Branch added successfully!" });
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to add branch" });
        } finally {
            setSaving(false);
        }
    };

    const startEdit = (branch: BusinessBranch) => {
        setEditId(branch.id);
        setEditForm({
            address: branch.address,
            cityId: branch.cityId || "",
            phone: branch.phone || "",
            operatingHours: branch.operatingHours || "",
        });
    };

    const handleEdit = async () => {
        if (!business || !editId || !editForm.address.trim()) return;
        setSaving(true);
        setMessage(null);
        try {
            const updated = await updateBranch(business.id, editId, {
                address: editForm.address,
                cityId: editForm.cityId || undefined,
                phone: editForm.phone || undefined,
                operatingHours: editForm.operatingHours || undefined,
            });
            setBranches((prev) => prev.map((b) => (b.id === editId ? updated : b)));
            setEditId(null);
            setMessage({ type: "success", text: "Branch updated successfully!" });
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to update branch" });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (branchId: string) => {
        if (!business || !confirm("Delete this branch?")) return;
        try {
            await deleteBranch(business.id, branchId);
            setBranches((prev) => prev.filter((b) => b.id !== branchId));
        } catch (err) {
            setMessage({ type: "error", text: (err as Error).message || "Failed to delete branch" });
        }
    };

    if (myLoading || loading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Branches
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your branch locations ({branches.length} total)
                    </p>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Branch
                </Button>
            </div>

            {message && (
                <div className={`flex items-center gap-2 rounded-lg p-3 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"}`}>
                    {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    {message.text}
                    <button onClick={() => setMessage(null)} className="ml-auto"><XIcon className="h-3 w-3" /></button>
                </div>
            )}

            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">New Branch</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Address *
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Branch address"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    City *
                                </label>
                                <select
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                    value={form.cityId}
                                    onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                                >
                                    <option value="">Select city</option>
                                    {cities.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Phone
                                    </label>
                                    <Input
                                        type="tel"
                                        placeholder="Phone number"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Operating Hours
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="e.g. Mon-Fri 9AM-6PM"
                                        value={form.operatingHours}
                                        onChange={(e) => setForm({ ...form, operatingHours: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleAdd} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                                    {saving ? "Adding..." : "Add Branch"}
                                </Button>
                                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {branches.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <MapPin className="h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-gray-500 dark:text-gray-400">No branches yet</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {branches.map((branch) => (
                        <Card key={branch.id}>
                            <CardContent className="p-6">
                                {editId === branch.id ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Address *</label>
                                            <Input type="text" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                                            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white" value={editForm.cityId} onChange={(e) => setEditForm({ ...editForm, cityId: e.target.value })}>
                                                <option value="">Select city</option>
                                                {cities.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                                            </select>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                                <Input type="tel" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Operating Hours</label>
                                                <Input type="text" value={editForm.operatingHours} onChange={(e) => setEditForm({ ...editForm, operatingHours: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" onClick={handleEdit} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                                                <Save className="mr-1 h-3 w-3" />{saving ? "Saving..." : "Save"}
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={() => setEditId(null)}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {branch.address}
                                                </h3>
                                                {branch.city && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {branch.city.name}
                                                    </p>
                                                )}
                                                {branch.phone && (
                                                    <p className="mt-1 flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                        <Phone className="mr-1 h-3 w-3" />
                                                        {branch.phone}
                                                    </p>
                                                )}
                                                {branch.operatingHours && (
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                        {branch.operatingHours}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button variant="outline" size="sm" onClick={() => startEdit(branch)}>
                                                <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleDelete(branch.id)}>
                                                <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
