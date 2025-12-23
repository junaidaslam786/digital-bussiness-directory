import { Skeleton } from "@/components/ui/Skeleton";

export default function EnterpriseLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-4 h-6 w-64" />

      {/* Header */}
      <div className="mb-8 mt-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="mb-2 h-10 w-full max-w-2xl" />
            <Skeleton className="mb-3 h-6 w-48" />
            <Skeleton className="h-5 w-full max-w-xl" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Gallery */}
          <Skeleton className="h-96 w-full rounded-lg" />

          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-800">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <Skeleton className="mb-4 h-6 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <Skeleton className="mb-4 h-6 w-48" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
