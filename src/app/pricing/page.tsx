"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, X, Star, Zap, Building2, Crown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {

    const packages = [
        {
            id: "freemium",
            name: "Freemium",
            icon: Building2,
            description: "Perfect for getting started",
            price: 50,
            popular: false,
            features: [
                { name: "Basic business profile", included: true },
                { name: "Contact information display", included: true },
                { name: "Business hours", included: true },
                { name: "Basic search visibility", included: true },
                { name: "Customer reviews", included: true },
                { name: "Up to 3 images", included: true },
                { name: "Priority support", included: false },
                { name: "Featured listing", included: false },
                { name: "Analytics dashboard", included: false },
                { name: "Product listings", included: false },
            ],
            cta: "Start Freemium Plan",
            buttonVariant: "outline" as const,
        },
        {
            id: "basic",
            name: "Basic",
            icon: Star,
            description: "Ideal for small businesses",
            price: 100,
            popular: false,
            features: [
                { name: "Everything in Free, plus:", included: true },
                { name: "Unlimited images", included: true },
                { name: "Up to 10 products/services", included: true },
                { name: "Enhanced search ranking", included: true },
                { name: "Basic analytics", included: true },
                { name: "Email support", included: true },
                { name: "Social media links", included: true },
                { name: "Featured listing", included: false },
                { name: "Priority support", included: false },
                { name: "API access", included: false },
            ],
            cta: "Start Basic Plan",
            buttonVariant: "outline" as const,
        },
        {
            id: "premium",
            name: "Premium",
            icon: Zap,
            description: "Best for growing businesses",
            price: 200,
            popular: true,
            features: [
                { name: "Everything in Basic, plus:", included: true },
                { name: "Unlimited products/services", included: true },
                { name: "Featured listing badge", included: true },
                { name: "Advanced analytics & insights", included: true },
                { name: "Priority search placement", included: true },
                { name: "Multiple locations/branches", included: true },
                { name: "Priority email support", included: true },
                { name: "Custom branding options", included: true },
                { name: "Review management tools", included: true },
                { name: "Monthly performance reports", included: true },
            ],
            cta: "Start Premium Plan",
            buttonVariant: "default" as const,
            highlight: true,
        },
        {
            id: "enterprise",
            name: "Enterprise",
            icon: Crown,
            description: "For large organizations",
            price: 300,
            popular: false,
            features: [
                { name: "Everything in Premium, plus:", included: true },
                { name: "Dedicated account manager", included: true },
                { name: "API access", included: true },
                { name: "Custom integrations", included: true },
                { name: "White-label options", included: true },
                { name: "Advanced security features", included: true },
                { name: "24/7 phone & email support", included: true },
                { name: "Custom analytics reports", included: true },
                { name: "Priority placement guarantee", included: true },
                { name: "Team collaboration tools", included: true },
            ],
            cta: "Contact Sales",
            buttonVariant: "outline" as const,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="container relative mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-5xl font-bold">
                            Simple, Transparent Pricing
                        </h1>
                        <p className="text-xl text-blue-100">
                            Choose the perfect plan to grow your business presence in South Korea
                        </p>
                        <div className="mt-6 inline-block rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold">
                            🎉 Pakistan Business Association Korea Members: Get 10% OFF on all plans!
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Pricing Info */}
                <div className="mb-12 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        All plans are billed <span className="font-semibold text-blue-600 dark:text-blue-400">annually</span>
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-8 lg:grid-cols-4">
                    {packages.map((pkg) => {
                        const Icon = pkg.icon;
                        const price = pkg.price;
                        const pricePerMonth = Math.round(price / 12);

                        return (
                            <Card
                                key={pkg.id}
                                className={`relative flex flex-col transition-all hover:shadow-xl ${pkg.highlight
                                    ? "scale-105 border-2 border-blue-600 shadow-lg dark:border-blue-500"
                                    : ""
                                    }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <Badge className="bg-blue-600 px-4 py-1 text-white">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="pb-8 pt-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div
                                            className={`rounded-lg p-3 ${pkg.highlight
                                                ? "bg-blue-100 dark:bg-blue-900/30"
                                                : "bg-gray-100 dark:bg-gray-800"
                                                }`}
                                        >
                                            <Icon
                                                className={`h-6 w-6 ${pkg.highlight
                                                    ? "text-blue-600 dark:text-blue-400"
                                                    : "text-gray-600 dark:text-gray-400"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {pkg.description}
                                    </p>

                                    <div className="mt-6">
                                        <div className="flex items-baseline">
                                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                                ${price.toLocaleString()}
                                            </span>
                                            {price > 0 && (
                                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                                    /year
                                                </span>
                                            )}
                                        </div>
                                        {price > 0 && (
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                ${pricePerMonth}/month when billed annually
                                            </p>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="flex flex-1 flex-col">
                                    <ul className="mb-8 flex-1 space-y-3">
                                        {pkg.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                                                ) : (
                                                    <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-700" />
                                                )}
                                                <span
                                                    className={`text-sm ${feature.included
                                                        ? "text-gray-700 dark:text-gray-300"
                                                        : "text-gray-400 dark:text-gray-600"
                                                        }`}
                                                >
                                                    {feature.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/claim" className="block">
                                        <Button
                                            variant={pkg.buttonVariant}
                                            className={`w-full ${pkg.highlight
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : ""
                                                }`}
                                        >
                                            {pkg.cta}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="mx-auto mt-24 max-w-3xl">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                                    Can I change my plan later?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Yes! You can upgrade or downgrade your plan at any time. Changes
                                    will be prorated and reflected in your next billing cycle.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                                    What payment methods do you accept?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We accept all major credit cards (Visa, MasterCard, AMEX), as well
                                    as bank transfers for yearly plans.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                                    Is there a free trial?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    The Free Listing plan is available indefinitely. For paid plans, we
                                    offer a 14-day money-back guarantee if you're not satisfied.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                                    Do you offer refunds?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Yes, we offer a 14-day money-back guarantee for all paid plans. No
                                    questions asked.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mx-auto mt-24 max-w-4xl rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-center text-white">
                    <h2 className="mb-4 text-3xl font-bold">
                        Ready to grow your business?
                    </h2>
                    <p className="mb-8 text-xl text-blue-100">
                        Join thousands of businesses already listed on KoreaBiz Directory
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/claim">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                Get Started Now
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white/10"
                            >
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
