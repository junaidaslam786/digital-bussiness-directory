import type { BusinessHour, DayOfWeek } from "@/types";

function findToday(hours: BusinessHour[]): BusinessHour | undefined {
  const dayNames: DayOfWeek[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = dayNames[new Date().getDay()];
  return hours.find((h) => h.dayOfWeek === today);
}

export function isOpenNow(hours: BusinessHour[]): boolean {
  const entry = findToday(hours);
  if (!entry || entry.isClosed) return false;

  const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  const [openH, openM] = entry.openTime.split(":").map(Number);
  const [closeH, closeM] = entry.closeTime.split(":").map(Number);

  return currentTime >= openH * 60 + openM && currentTime < closeH * 60 + closeM;
}

export function getOpenStatus(hours: BusinessHour[]): {
  isOpen: boolean;
  message: string;
} {
  const entry = findToday(hours);

  if (!entry || entry.isClosed) {
    return { isOpen: false, message: "Closed today" };
  }

  const isOpen = isOpenNow(hours);

  if (isOpen) {
    return { isOpen: true, message: `Open until ${entry.closeTime}` };
  }

  return { isOpen: false, message: `Opens at ${entry.openTime}` };
}

export function formatBusinessHours(dayHours: BusinessHour): string {
  if (dayHours.isClosed) return "Closed";
  return `${dayHours.openTime} - ${dayHours.closeTime}`;
}

/**
 * Format a date as a relative time string (e.g., "2 hours ago")
 */
export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

/**
 * Format a date as a short date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Format a date as a full date time string
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

