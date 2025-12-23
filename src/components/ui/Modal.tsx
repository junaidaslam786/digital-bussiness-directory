"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange?.(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ModalContent.displayName = "ModalContent";

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

const ModalClose = ({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) => (
  <button
    onClick={onClose}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:pointer-events-none dark:ring-offset-gray-950 dark:focus:ring-gray-300",
      className
    )}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
);

export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
