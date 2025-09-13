import React from "react";
import { X } from "lucide-react";
import { useModalClose } from "@/hooks/useModalClose";
import { cn } from "@/utils/cn";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "default" | "lg" | "xl";
  className?: string;
}

export const Dialog = React.memo<DialogProps>(
  ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = "default",
    className,
  }) => {
    const modalRef = useModalClose(
      isOpen,
      onClose,
    ) as React.RefObject<HTMLDivElement>;

    const sizes = {
      sm: "max-w-md",
      default: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div
            ref={modalRef}
            className={cn(
              "w-full bg-background border rounded-lg shadow-lg p-6 transition-all duration-200",
              sizes[size],
              className,
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "dialog-title" : undefined}
            aria-describedby={description ? "dialog-description" : undefined}
          >
            <div className="flex items-center justify-between mb-4">
              {title && (
                <h2 id="dialog-title" className="text-lg font-semibold">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {description && (
              <p
                id="dialog-description"
                className="text-sm text-muted-foreground mb-6"
              >
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  },
);
