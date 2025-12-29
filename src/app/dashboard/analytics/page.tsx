"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Eye, Star, TrendingUp, Users, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Analytics
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Track your business performance
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Views
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    1,247
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                    ↑ 15.3% this month
                                </p>
                            </div>
                            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
                                <Eye className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Avg Rating
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    4.8
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    156 reviews
                                </p>
                            </div>
                            <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
                                <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Clicks
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    324
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                    ↑ 8.2% this month
                                </p>
                            </div>
                            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Conversion
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    26%
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                    ↑ 3.1% this month
                                </p>
                            </div>
                            <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
                                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Views Over Time</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-64 items-end justify-around space-x-2">
                        {[45, 70, 55, 90, 75, 60, 85].map((height, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-t-lg bg-emerald-600 transition-all hover:bg-emerald-700 dark:bg-emerald-500"
                                style={{ height: `${height}%` }}
                            />
                        ))}
                    </div>
                    <div className="mt-4 flex justify-around text-sm text-gray-500">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
