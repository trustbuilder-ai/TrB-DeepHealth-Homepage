import React from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useModalClose } from "@/hooks/useModalClose";

export interface EnhancedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

export const EnhancedDialog = React.memo<EnhancedDialogProps>(
  ({
    isOpen,
    onClose,
    title,
    description,
    children,
    className,
    overlayClassName,
  }) => {
    const dialogRef = useModalClose(isOpen, onClose);

    if (!isOpen) return null;

    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4",
          "bg-black/50 backdrop-blur-sm",
          overlayClassName,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
      >
        <div
          ref={dialogRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "relative w-full max-w-md max-h-[90vh] overflow-auto",
            "bg-background rounded-lg shadow-xl border",
            "transform transition-all duration-200 ease-out",
            "animate-in fade-in-0 zoom-in-95",
            className,
          )}
          role="document"
          tabIndex={-1}
          aria-labelledby={title ? "dialog-title" : undefined}
          aria-describedby={description ? "dialog-description" : undefined}
        >
          <div className="p-6">
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
              <p id="dialog-description" className="text-sm opacity-80 mb-6">
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

EnhancedDialog.displayName = "EnhancedDialog";
