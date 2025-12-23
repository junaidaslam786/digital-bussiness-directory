import { Skeleton } from "@/components/ui/Skeleton";

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <Skeleton className="h-11 w-full" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block lg:w-64">
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="mt-2 h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
