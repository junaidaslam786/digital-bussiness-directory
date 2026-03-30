"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCategoriesStore } from "@/store/categories.api";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    FolderTree,
    Loader2,
    Save,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formName, setFormName] = useState("");

    const {
        categories,
        loading,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useCategoriesStore();

    useEffect(() => {
        fetchCategories({ includeInactive: true });
    }, [fetchCategories]);

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreate = async () => {
        if (!formName.trim()) return;
        try {
            await createCategory({ name: formName.trim() });
            setFormName("");
            setShowForm(false);
        } catch {}
    };

    const handleUpdate = async () => {
        if (!editId || !formName.trim()) return;
        try {
            await updateCategory(editId, { name: formName.trim() });
            setFormName("");
            setEditId(null);
        } catch {}
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this category?")) return;
        try { await deleteCategory(id); } catch {}
    };

    const startEdit = (id: string, name: string) => {
        setEditId(id);
        setFormName(name);
        setShowForm(false);
    };

    if (loading && categories.length === 0) {
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
                        Categories
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage business categories
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { setShowForm(true); setEditId(null); setFormName(""); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search categories..."
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
                            Total Categories
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {categories.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Active
                        </div>
                        <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {categories.filter((c) => c.isActive).length}
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
                                placeholder="Category name..."
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                className="flex-1"
                            />
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

            {/* Categories Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((category) => (
                    <Card
                        key={category.id}
                        className="hover:shadow-lg transition-all hover:scale-105"
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                        <FolderTree className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <CardTitle className="text-lg">{category.name}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex h-2 w-2 rounded-full ${category.isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {category.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="sm" onClick={() => startEdit(category.id, category.name)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
