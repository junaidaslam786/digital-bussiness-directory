import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900",
        secondary:
          "border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
        destructive:
          "border-transparent bg-red-500 text-white dark:bg-red-900 dark:text-gray-50",
        outline: "text-gray-900 dark:text-gray-50",
        success:
          "border-transparent bg-green-500 text-white dark:bg-green-900 dark:text-gray-50",
        warning:
          "border-transparent bg-yellow-500 text-white dark:bg-yellow-900 dark:text-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
