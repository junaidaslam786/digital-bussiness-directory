import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700",
        className
      )}
    >
      <div className="mb-4 text-gray-400 dark:text-gray-600">
        {icon || <FileQuestion className="h-16 w-16" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {description && (
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
