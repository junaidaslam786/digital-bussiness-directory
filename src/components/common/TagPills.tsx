import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface TagPillsProps {
  tags: string[];
  variant?: "default" | "secondary" | "outline";
  removable?: boolean;
  onRemove?: (tag: string) => void;
  className?: string;
}

export function TagPills({
  tags,
  variant = "secondary",
  removable = false,
  onRemove,
  className,
}: TagPillsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={variant}
          className={cn("flex items-center gap-1", removable && "pr-1")}
        >
          {tag}
          {removable && onRemove && (
            <button
              onClick={() => onRemove(tag)}
              className="ml-1 rounded-full p-0.5 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
}
