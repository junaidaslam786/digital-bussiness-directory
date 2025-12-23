import { Enterprise } from "@/types";
import Image from "next/image";

interface BusinessCardProps {
  enterprise: Enterprise;
}

export function BusinessCard({ enterprise }: BusinessCardProps) {
  if (!enterprise.businessCard) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <Image
        src={enterprise.businessCard}
        alt={`${enterprise.name} Business Card`}
        width={800}
        height={500}
        className="h-auto w-full object-contain"
        unoptimized
      />
    </div>
  );
}
