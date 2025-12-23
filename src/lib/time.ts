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
