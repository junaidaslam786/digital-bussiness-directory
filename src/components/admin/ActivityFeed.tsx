"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
    Building2,
    UserPlus,
    Star,
    MapPin,
    FolderTree,
    CheckCircle2,
} from "lucide-react";
import { formatDistanceToNow } from "@/lib/time";

interface Activity {
    id: string;
    type: "business" | "review" | "user" | "category" | "city" | "verification";
    title: string;
    description: string;
    timestamp: Date;
}

const activityIcons = {
    business: Building2,
    review: Star,
    user: UserPlus,
    category: FolderTree,
    city: MapPin,
    verification: CheckCircle2,
};

const activityColors = {
    business: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
    review: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
    user: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
    category: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
    city: "text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/30",
    verification:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
};

interface ActivityFeedProps {
    activities: Activity[];
    maxItems?: number;
}

export function ActivityFeed({ activities, maxItems = 10 }: ActivityFeedProps) {
    const displayedActivities = activities.slice(0, maxItems);

    return (
        <Card className="animate-slide-in-up">
            <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {displayedActivities.map((activity, index) => {
                        const Icon = activityIcons[activity.type];
                        const colorClass = activityColors[activity.type];

                        return (
                            <div
                                key={activity.id}
                                className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                            >
                                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {activity.title}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {activity.description}
                                    </p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        {formatDistanceToNow(activity.timestamp)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
