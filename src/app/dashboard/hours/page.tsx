"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Clock,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import type { BusinessHour, DayOfWeek } from "@/types/enterprise";

const DAYS: { value: DayOfWeek; label: string }[] = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
];

const DEFAULT_OPEN = "09:00";
const DEFAULT_CLOSE = "18:00";

export default function BusinessHoursPage() {
  const {
    myBusinesses,
    myLoading,
    fetchMyBusinesses,
    fetchHours,
    createHour,
    updateHour,
    deleteHour,
  } = useBusinessesStore();
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    dayOfWeek: "mon" as DayOfWeek,
    openTime: DEFAULT_OPEN,
    closeTime: DEFAULT_CLOSE,
    isClosed: false,
  });

  const business = myBusinesses[0];

  useEffect(() => {
    fetchMyBusinesses();
  }, [fetchMyBusinesses]);

  useEffect(() => {
    if (business?.id) {
      setLoading(true);
      fetchHours(business.id)
        .then((h) => setHours(h))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [business?.id, fetchHours]);

  const usedDays = new Set(hours.map((h) => h.dayOfWeek));
  const availableDays = DAYS.filter((d) => !usedDays.has(d.value) || editId);

  const resetForm = () => {
    const nextDay = DAYS.find((d) => !usedDays.has(d.value));
    setForm({
      dayOfWeek: nextDay?.value || "mon",
      openTime: DEFAULT_OPEN,
      closeTime: DEFAULT_CLOSE,
      isClosed: false,
    });
  };

  const handleAdd = async () => {
    if (!business) return;
    setSaving(true);
    setMessage(null);
    try {
      const created = await createHour(business.id, {
        dayOfWeek: form.dayOfWeek,
        openTime: form.isClosed ? undefined : form.openTime,
        closeTime: form.isClosed ? undefined : form.closeTime,
        isClosed: form.isClosed,
      });
      setHours((prev) =>
        [...prev, created].sort(
          (a, b) =>
            DAYS.findIndex((d) => d.value === a.dayOfWeek) -
            DAYS.findIndex((d) => d.value === b.dayOfWeek)
        )
      );
      setShowForm(false);
      resetForm();
      setMessage({ type: "success", text: "Business hours added!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: (err as Error).message || "Failed to add hours",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!business || !editId) return;
    setSaving(true);
    setMessage(null);
    try {
      const updated = await updateHour(business.id, editId, {
        openTime: form.isClosed ? undefined : form.openTime,
        closeTime: form.isClosed ? undefined : form.closeTime,
        isClosed: form.isClosed,
      });
      setHours((prev) => prev.map((h) => (h.id === editId ? updated : h)));
      setEditId(null);
      resetForm();
      setMessage({ type: "success", text: "Business hours updated!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: (err as Error).message || "Failed to update hours",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (hourId: string) => {
    if (!business || !confirm("Delete this business hour entry?")) return;
    try {
      await deleteHour(business.id, hourId);
      setHours((prev) => prev.filter((h) => h.id !== hourId));
      setMessage({ type: "success", text: "Business hours deleted." });
    } catch (err) {
      setMessage({
        type: "error",
        text: (err as Error).message || "Failed to delete hours",
      });
    }
  };

  const startEdit = (hour: BusinessHour) => {
    setEditId(hour.id);
    setShowForm(false);
    setForm({
      dayOfWeek: hour.dayOfWeek,
      openTime: hour.openTime || DEFAULT_OPEN,
      closeTime: hour.closeTime || DEFAULT_CLOSE,
      isClosed: hour.isClosed,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    resetForm();
  };

  const dayLabel = (day: DayOfWeek) =>
    DAYS.find((d) => d.value === day)?.label || day;

  if (myLoading || loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          No business found. Create a business first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Business Hours
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Set your opening hours for each day of the week
          </p>
        </div>
        {availableDays.length > 0 && !editId && (
          <Button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Hours
          </Button>
        )}
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
              : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-auto">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Business Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Day of Week
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  value={form.dayOfWeek}
                  onChange={(e) =>
                    setForm({ ...form, dayOfWeek: e.target.value as DayOfWeek })
                  }
                >
                  {DAYS.filter((d) => !usedDays.has(d.value)).map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isClosed"
                  checked={form.isClosed}
                  onChange={(e) =>
                    setForm({ ...form, isClosed: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="isClosed"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Closed this day
                </label>
              </div>

              {!form.isClosed && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Open Time
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                      value={form.openTime}
                      onChange={(e) =>
                        setForm({ ...form, openTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Close Time
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-600 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                      value={form.closeTime}
                      onChange={(e) =>
                        setForm({ ...form, closeTime: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {saving ? "Adding..." : "Add Hours"}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hours List */}
      {hours.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Clock className="h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No business hours set yet
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Add your opening hours so customers know when to visit
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {hours.map((hour) => (
            <Card key={hour.id}>
              <CardContent className="p-4">
                {editId === hour.id ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {dayLabel(hour.dayOfWeek)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`edit-closed-${hour.id}`}
                        checked={form.isClosed}
                        onChange={(e) =>
                          setForm({ ...form, isClosed: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <label
                        htmlFor={`edit-closed-${hour.id}`}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        Closed
                      </label>
                    </div>
                    {!form.isClosed && (
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Open
                          </label>
                          <input
                            type="time"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                            value={form.openTime}
                            onChange={(e) =>
                              setForm({ ...form, openTime: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Close
                          </label>
                          <input
                            type="time"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                            value={form.closeTime}
                            onChange={(e) =>
                              setForm({ ...form, closeTime: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleUpdate}
                        disabled={saving}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Save className="mr-1 h-3 w-3" />
                        {saving ? "Saving..." : "Save"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                        <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {dayLabel(hour.dayOfWeek)}
                        </h3>
                        {hour.isClosed ? (
                          <span className="text-sm text-red-500">Closed</span>
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {hour.openTime} – {hour.closeTime}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(hour)}
                      >
                        <Edit className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(hour.id)}
                      >
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
