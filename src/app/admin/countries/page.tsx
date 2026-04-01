"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLocationsStore } from "@/store/locations.api";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Globe,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formSubdomain, setFormSubdomain] = useState("");

  const {
    countries,
    countriesLoading,
    fetchCountries,
    createCountry,
    updateCountry,
    deleteCountry,
  } = useLocationsStore();

  useEffect(() => {
    fetchCountries(true);
  }, [fetchCountries]);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async () => {
    if (!formName.trim()) return;
    try {
      await createCountry({ name: formName.trim(), countryCode: formCode.trim(), subdomain: formSubdomain.trim() });
      setFormName("");
      setFormCode("");
      setFormSubdomain("");
      setShowForm(false);
    } catch {}
  };

  const handleUpdate = async () => {
    if (!editId || !formName.trim()) return;
    try {
      await updateCountry(editId, { name: formName.trim(), countryCode: formCode.trim(), subdomain: formSubdomain.trim() });
      setFormName("");
      setFormCode("");
      setFormSubdomain("");
      setEditId(null);
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this country? Cities linked to it may be affected."))
      return;
    try {
      await deleteCountry(id);
    } catch {}
  };

  const startEdit = (id: string, name: string, countryCode?: string, subdomain?: string) => {
    setEditId(id);
    setFormName(name);
    setFormCode(countryCode || "");
    setFormSubdomain(subdomain || "");
    setShowForm(false);
  };

  if (countriesLoading && countries.length === 0) {
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
            Countries
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage countries in your directory
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setFormName("");
            setFormCode("");
            setFormSubdomain("");
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search countries..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Countries
          </div>
          <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {countries.length}
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Form */}
      {(showForm || editId) && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Input
                type="text"
                placeholder="Country name..."
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="flex-1"
              />
              <Input
                type="text"
                placeholder="Code (e.g. KR)"
                value={formCode}
                onChange={(e) => setFormCode(e.target.value)}
                className="w-32"
              />
              <Input
                type="text"
                placeholder="Subdomain (e.g. kr)"
                value={formSubdomain}
                onChange={(e) => setFormSubdomain(e.target.value)}
                className="w-40"
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
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setFormName("");
                  setFormCode("");
                  setFormSubdomain("");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Countries Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Subdomain
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
                {filteredCountries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      <Globe className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      No countries found
                    </td>
                  </tr>
                ) : (
                  filteredCountries.map((country) => (
                    <tr
                      key={country.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {country.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {country.countryCode || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {country.subdomain || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          country.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}>
                          {country.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              startEdit(country.id, country.name, country.countryCode, country.subdomain)
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(country.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
