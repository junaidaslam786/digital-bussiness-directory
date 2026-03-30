"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLocationsStore } from "@/store/locations.api";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    MapPin,
    Loader2,
    Save,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CitiesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formName, setFormName] = useState("");
    const [formCountryId, setFormCountryId] = useState("");

    const {
        cities,
        citiesLoading,
        countries,
        fetchCities,
        fetchCountries,
        createCity,
        updateCity,
        deleteCity,
    } = useLocationsStore();

    useEffect(() => {
        fetchCities({ includeInactive: true });
        fetchCountries(true);
    }, [fetchCities, fetchCountries]);

    const filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreate = async () => {
        if (!formName.trim() || !formCountryId) return;
        try {
            await createCity({ name: formName.trim(), countryId: formCountryId });
            setFormName("");
            setFormCountryId("");
            setShowForm(false);
        } catch {}
    };

    const handleUpdate = async () => {
        if (!editId || !formName.trim()) return;
        try {
            await updateCity(editId, { name: formName.trim() });
            setFormName("");
            setEditId(null);
        } catch {}
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this city?")) return;
        try { await deleteCity(id); } catch {}
    };

    const startEdit = (id: string, name: string) => {
        setEditId(id);
        setFormName(name);
        setShowForm(false);
    };

    if (citiesLoading && cities.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Cities
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage cities in your directory
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { setShowForm(true); setEditId(null); setFormName(""); setFormCountryId(""); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add City
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search cities..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Cities
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {cities.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Countries
                        </div>
                        <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {countries.length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Create/Edit Form */}
            {(showForm || editId) && (
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <Input
                                type="text"
                                placeholder="City name..."
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                className="flex-1"
                            />
                            {showForm && !editId && (
                                <select
                                    className="rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
                                    value={formCountryId}
                                    onChange={(e) => setFormCountryId(e.target.value)}
                                >
                                    <option value="">Select country...</option>
                                    {countries.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            )}
                            <Button
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={editId ? handleUpdate : handleCreate}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {editId ? "Update" : "Create"}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => { setShowForm(false); setEditId(null); setFormName(""); }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Cities Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        City
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Country
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {filteredCities.map((city) => (
                                    <tr
                                        key={city.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                                    <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {city.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className="text-sm text-gray-900 dark:text-gray-100">
                                                {city.country?.name || "N/A"}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 text-sm ${city.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                                                <span className={`h-2 w-2 rounded-full ${city.isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
                                                {city.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => startEdit(city.id, city.name)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(city.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
