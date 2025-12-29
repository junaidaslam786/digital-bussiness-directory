import { BusinessHours, DayHours } from "@/types";

export function isOpenNow(hours: BusinessHours): boolean {
  const now = new Date();
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  const today = dayNames[now.getDay()];
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const todayHours = hours[today];

  if (todayHours.closed) return false;

  const [openHour, openMin] = todayHours.open.split(":").map(Number);
  const [closeHour, closeMin] = todayHours.close.split(":").map(Number);

  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;

  return currentTime >= openTime && currentTime < closeTime;
}

export function getOpenStatus(hours: BusinessHours): {
  isOpen: boolean;
  message: string;
} {
  const now = new Date();
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
  const today = dayNames[now.getDay()];
  const todayHours = hours[today];

  if (todayHours.closed) {
    return {
      isOpen: false,
      message: "Closed today",
    };
  }

  const isOpen = isOpenNow(hours);

  if (isOpen) {
    return {
      isOpen: true,
      message: `Open until ${todayHours.close}`,
    };
  }

  return {
    isOpen: false,
    message: `Opens at ${todayHours.open}`,
  };
}

export function formatBusinessHours(dayHours: DayHours): string {
  if (dayHours.closed) return "Closed";
  return `${dayHours.open} - ${dayHours.close}`;
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

