"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
    title: string;
    value: number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    colorClass: "primary" | "success" | "warning" | "danger";
}

const colorConfig = {
    primary: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        icon: "text-blue-600 dark:text-blue-400",
        gradient: "gradient-primary",
    },
    success: {
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
        icon: "text-emerald-600 dark:text-emerald-400",
        gradient: "gradient-success",
    },
    warning: {
        bg: "bg-amber-100 dark:bg-amber-900/30",
        icon: "text-amber-600 dark:text-amber-400",
        gradient: "gradient-warning",
    },
    danger: {
        bg: "bg-red-100 dark:bg-red-900/30",
        icon: "text-red-600 dark:text-red-400",
        gradient: "gradient-danger",
    },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, colorClass }: StatCardProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const colors = colorConfig[colorClass];

    // Animate number count up
    useEffect(() => {
        const duration = 1000; // 1 second
        const steps = 30;
        const stepValue = value / steps;
        let current = 0;

        const interval = setInterval(() => {
            current += stepValue;
            if (current >= value) {
                setDisplayValue(value);
                clearInterval(interval);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(interval);
    }, [value]);

    return (
        <Card className="animate-slide-in-up overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                            {displayValue.toLocaleString()}
                        </p>
                        {subtitle && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
                        )}
                        {trend && (
                            <div className="mt-2 flex items-center text-sm">
                                <span
                                    className={
                                        trend.isPositive
                                            ? "font-medium text-emerald-600 dark:text-emerald-400"
                                            : "font-medium text-red-600 dark:text-red-400"
                                    }
                                >
                                    {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                                </span>
                                <span className="ml-2 text-gray-500 dark:text-gray-400">vs last month</span>
                            </div>
                        )}
                    </div>
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg}`}>
                        <Icon className={`h-7 w-7 ${colors.icon}`} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface DashboardStatsProps {
    stats: Array<Omit<StatCardProps, "icon"> & { icon: LucideIcon }>;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}
