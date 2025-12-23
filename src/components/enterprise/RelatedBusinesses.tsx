import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { Enterprise } from "@/types";
import { getRelatedEnterprises } from "@/lib/search";
import { enterprises } from "@/data/enterprises.mock";

interface RelatedBusinessesProps {
  currentEnterprise: Enterprise;
}

export function RelatedBusinesses({ currentEnterprise }: RelatedBusinessesProps) {
  const related = getRelatedEnterprises(currentEnterprise, enterprises, 3);

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
          <EnterpriseCard key={enterprise.slug} enterprise={enterprise} />
        ))}
      </div>
    </div>
  );
}
