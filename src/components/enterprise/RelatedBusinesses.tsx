"use client";

import { useEffect } from "react";
import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { Enterprise } from "@/types";
import { useBusinessesStore } from "@/store/businesses.api";

interface RelatedBusinessesProps {
  currentEnterprise: Enterprise;
}

export function RelatedBusinesses({ currentEnterprise }: RelatedBusinessesProps) {
  const { businesses, fetchBusinesses } = useBusinessesStore();

  useEffect(() => {
    if (businesses.length === 0) {
      fetchBusinesses();
    }
  }, [businesses.length, fetchBusinesses]);

  const related = businesses
    .filter((b) => b.id !== currentEnterprise.id && b.categoryId === currentEnterprise.categoryId)
    .slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Related Businesses
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {related.map((enterprise) => (
          <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
        ))}
      </div>
    </div>
  );
}
