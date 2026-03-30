"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAdminStore } from "@/store/admin.api";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Save,
  X,
  CreditCard,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { CreatePlanData } from "@/types/admin";

export default function PlansPage() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<CreatePlanData>({
    name: "",
    price: 0,
    durationInDays: 30,
    description: "",
    billingCycle: "MONTHLY",
    features: [],
    isActive: true,
    stripePriceId: "",
  });
  const [featuresText, setFeaturesText] = useState("");

  const { plans, plansLoading, fetchPlans, createPlan, updatePlan, deletePlan } = useAdminStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const resetForm = () => {
    setForm({ name: "", price: 0, durationInDays: 30, description: "", billingCycle: "MONTHLY", features: [], isActive: true, stripePriceId: "" });
    setFeaturesText("");
    setShowForm(false);
    setEditId(null);
  };

  const handleCreate = async () => {
    if (!form.name.trim()) return;
    try {
      await createPlan({ ...form, features: featuresText.split("\n").filter(Boolean) });
      resetForm();
    } catch {}
  };

  const handleUpdate = async () => {
    if (!editId || !form.name.trim()) return;
    try {
      await updatePlan(editId, { ...form, features: featuresText.split("\n").filter(Boolean) });
      resetForm();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this plan?")) return;
    try { await deletePlan(id); } catch {}
  };

  const startEdit = (plan: typeof plans[0]) => {
    setEditId(plan.id);
    setForm({
      name: plan.name,
      price: plan.price,
      durationInDays: plan.durationInDays,
      description: plan.description ?? "",
      billingCycle: plan.billingCycle,
      features: plan.features ?? [],
      isActive: plan.isActive,
      stripePriceId: plan.stripePriceId ?? "",
    });
    setFeaturesText((plan.features ?? []).join("\n"));
    setShowForm(false);
  };

  if (plansLoading && plans.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage pricing plans</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Plan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Plans</div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{plans.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
            <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{plans.filter((p) => p.isActive).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Avg Price</div>
            <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${plans.length > 0 ? (plans.reduce((s, p) => s + p.price, 0) / plans.length).toFixed(0) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {(showForm || editId) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{editId ? "Edit Plan" : "New Plan"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Plan name..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Price ($)</label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (days)</label>
                <Input type="number" value={form.durationInDays} onChange={(e) => setForm({ ...form, durationInDays: Number(e.target.value) })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Billing Cycle</label>
                <select className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900" value={form.billingCycle} onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}>
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Stripe Price ID</label>
                <Input value={form.stripePriceId ?? ""} onChange={(e) => setForm({ ...form, stripePriceId: e.target.value })} placeholder="price_1ABC... (from Stripe Dashboard)" />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Required for paid plans. Get this from Stripe Dashboard → Products → Prices.</p>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <Input value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Plan description..." />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Features (one per line)</label>
                <textarea className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900" rows={3} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Feature 1&#10;Feature 2" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={editId ? handleUpdate : handleCreate}>
                <Save className="mr-2 h-4 w-4" />
                {editId ? "Update" : "Create"}
              </Button>
              <Button variant="ghost" onClick={resetForm}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <Badge className={plan.isActive ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"}>
                  {plan.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/{plan.billingCycle}</span>
              </div>
              {plan.description && (
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
              )}
              <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Duration: {plan.durationInDays} days
              </div>
              <div className="mb-4 flex items-center gap-2 text-sm">
                <CreditCard className="h-4 w-4 text-gray-400" />
                {plan.stripePriceId ? (
                  <span className="text-emerald-600 dark:text-emerald-400">Stripe configured</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">No Stripe price ID</span>
                )}
              </div>
              {plan.features && plan.features.length > 0 && (
                <ul className="mb-4 space-y-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="mr-2 text-emerald-500">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="sm" onClick={() => startEdit(plan)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(plan.id)}>
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
