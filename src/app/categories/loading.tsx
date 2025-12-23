import { Skeleton } from "@/components/ui/Skeleton";

export default function CategoriesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-4 h-8 w-48" />
      
      <div className="mb-8 mt-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-2 h-5 w-96" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="mb-4 h-16 w-16 rounded-full" />
              <Skeleton className="mb-2 h-6 w-32" />
              <Skeleton className="mb-3 h-4 w-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
