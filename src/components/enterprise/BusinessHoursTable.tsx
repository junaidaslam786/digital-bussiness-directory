import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BusinessHours } from "@/types";
import { Clock } from "lucide-react";
import { getOpenStatus } from "@/lib/time";

interface BusinessHoursTableProps {
  hours: BusinessHours;
}

export function BusinessHoursTable({ hours }: BusinessHoursTableProps) {
  const days = [
    { key: "mon", label: "Monday" },
    { key: "tue", label: "Tuesday" },
    { key: "wed", label: "Wednesday" },
    { key: "thu", label: "Thursday" },
    { key: "fri", label: "Friday" },
    { key: "sat", label: "Saturday" },
    { key: "sun", label: "Sunday" },
  ];

  const openStatus = getOpenStatus(hours);
  const today = new Date().getDay();
  const todayKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][today];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Business Hours</span>
          </CardTitle>
          <Badge variant={openStatus.isOpen ? "success" : "destructive"}>
            {openStatus.isOpen ? "Open Now" : "Closed"}
          </Badge>
        </div>
        {openStatus.message && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {openStatus.message}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {days.map(({ key, label }) => {
            const dayHours = hours[key as keyof BusinessHours];
            const isToday = key === todayKey;

            return (
              <div
                key={key}
                className={`flex items-center justify-between py-2 ${
                  isToday
                    ? "rounded-lg bg-blue-50 px-3 font-semibold dark:bg-blue-950"
                    : ""
                }`}
              >
                <span
                  className={`text-sm ${
                    isToday
                      ? "text-blue-900 dark:text-blue-100"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`text-sm ${
                    isToday
                      ? "text-blue-900 dark:text-blue-100"
                      : dayHours.closed
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {dayHours.closed
                    ? "Closed"
                    : `${dayHours.open} - ${dayHours.close}`}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
