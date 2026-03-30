"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Check, Star, Zap, Building2, Crown, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSubscriptionsStore } from "@/store/subscriptions.api";
import { useAuthStore } from "@/store/auth.store";

const planIcons: Record<string, typeof Building2> = {
  free: Building2,
  starter: Star,
  professional: Zap,
  enterprise: Crown,
};

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = searchParams.get("businessId");

  const { plans, plansLoading, fetchPlans, createCheckout } = useSubscriptionsStore();
  const { isAuthenticated } = useAuthStore();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSelectPlan = async (planId: string) => {
    if (!isAuthenticated) {
      router.push("/login?from=/pricing" + (businessId ? `&businessId=${businessId}` : ""));
      return;
    }

    if (!businessId) {
      router.push("/claim");
      return;
    }

    setCheckoutLoading(planId);
    try {
      const { sessionUrl } = await createCheckout({ planId, businessId });
      window.location.href = sessionUrl;
    } catch (err) {
      alert((err as Error).message || "Failed to start checkout. Please try again.");
      setCheckoutLoading(null);
    }
  };

  const activePlans = plans.filter((p) => p.isActive);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-5xl font-bold">Simple, Transparent Pricing</h1>
            <p className="text-xl text-blue-100">
              Choose the perfect plan to grow your business presence
            </p>
            {businessId && (
              <div className="mt-6 inline-block rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold">
                Select a plan to activate your business listing
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {plansLoading ? (
          <div className="grid gap-8 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[500px] rounded-xl" />
            ))}
          </div>
        ) : activePlans.length === 0 ? (
          <p className="text-center text-gray-500">No plans available at the moment.</p>
        ) : (
          <div className={`grid gap-8 ${activePlans.length <= 2 ? "lg:grid-cols-2 max-w-3xl mx-auto" : activePlans.length === 3 ? "lg:grid-cols-3 max-w-5xl mx-auto" : "lg:grid-cols-4"}`}>
            {activePlans.map((plan, idx) => {
              const Icon = planIcons[plan.name.toLowerCase()] ?? Building2;
              const isPopular = idx === Math.floor(activePlans.length / 2);
              const pricePerMonth = plan.durationInDays > 0 ? Math.round(plan.price / Math.ceil(plan.durationInDays / 30)) : 0;

              return (
                <Card
                  key={plan.id}
                  className={`relative flex flex-col transition-all hover:shadow-xl ${isPopular ? "scale-105 border-2 border-blue-600 shadow-lg dark:border-blue-500" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-blue-600 px-4 py-1 text-white">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="pb-8 pt-6">
                    <div className="mb-4">
                      <div className={`rounded-lg p-3 inline-flex ${isPopular ? "bg-blue-100 dark:bg-blue-900/30" : "bg-gray-100 dark:bg-gray-800"}`}>
                        <Icon className={`h-6 w-6 ${isPopular ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
                      </div>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                    {plan.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                    )}

                    <div className="mt-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${plan.price.toLocaleString()}
                        </span>
                        {plan.price > 0 && (
                          <span className="ml-2 text-gray-600 dark:text-gray-400">
                            /{plan.billingCycle}
                          </span>
                        )}
                      </div>
                      {plan.price > 0 && plan.durationInDays > 30 && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          ~${pricePerMonth}/month
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col">
                    {plan.features && plan.features.length > 0 && (
                      <ul className="mb-8 flex-1 space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Button
                      className={`w-full ${isPopular ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                      variant={isPopular ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={checkoutLoading === plan.id}
                    >
                      {checkoutLoading === plan.id ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                      ) : businessId ? (
                        `Select ${plan.name}`
                      ) : (
                        "Get Started"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">How does it work?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create your business listing, choose a subscription plan, complete payment, and your listing will be reviewed and published by our team.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Can I change my plan later?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! You can upgrade or downgrade your plan at any time. Changes will be prorated.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">What payment methods do you accept?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept all major credit cards (Visa, MasterCard, AMEX) through our secure Stripe payment processing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-24 max-w-4xl rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready to grow your business?</h2>
          <p className="mb-8 text-xl text-blue-100">
            Join thousands of businesses already listed in our directory
          </p>
          <Link href="/claim">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              List Your Business
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>}>
      <PricingContent />
    </Suspense>
  );
}
