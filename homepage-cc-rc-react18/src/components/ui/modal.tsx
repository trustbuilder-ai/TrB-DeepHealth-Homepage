import React from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useModalClose } from "@/hooks/useModalClose";
import { Theme } from "@/styles/themes";

export interface EnhancedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  theme?: Theme;
  size?: "sm" | "md" | "lg" | "xl" | "sidebar-left" | "sidebar-right";
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
    theme,
    size = "md",
  }) => {
    const dialogRef = useModalClose(isOpen, onClose);

    // Additional ESC key handler as backup
    React.useEffect(() => {
      if (!isOpen) return;

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
      };

      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "max-w-sm";
        case "md":
          return "max-w-md";
        case "lg":
          return "max-w-2xl";
        case "xl":
          return "max-w-4xl";
        case "sidebar-left":
          return "fixed top-4 left-4 h-[calc(100vh-2rem)] w-80 max-w-none";
        case "sidebar-right":
          return "fixed top-4 right-4 h-[calc(100vh-2rem)] w-96 max-w-none";
        default:
          return "max-w-md";
      }
    };

    const getPositionClasses = () => {
      if (size === "sidebar-left" || size === "sidebar-right") {
        return "";
      }
      return "flex items-center justify-center p-4";
    };

    return (
      <div
        className={cn(
          "fixed inset-0 z-50",
          "bg-black/50 backdrop-blur-sm",
          getPositionClasses(),
          overlayClassName,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "relative w-full max-h-[90vh] overflow-auto",
            "rounded-lg shadow-xl border",
            "transform transition-all duration-200 ease-out",
            "animate-in fade-in-0 zoom-in-95",
            getSizeClasses(),
            theme
              ? `${theme.isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`
              : "bg-background border-border",
            size === "sidebar-left" || size === "sidebar-right"
              ? "flex flex-col"
              : "",
            className,
          )}
          role="document"
          tabIndex={-1}
          aria-labelledby={title ? "dialog-title" : undefined}
          aria-describedby={description ? "dialog-description" : undefined}
        >
          <div
            className={
              size === "sidebar-left" || size === "sidebar-right" ? "" : "p-6"
            }
          >
            {(title || size === "sidebar-left" || size === "sidebar-right") && (
              <div
                className={`flex items-center justify-between ${size === "sidebar-left" || size === "sidebar-right" ? "p-4 border-b" : "mb-4"}`}
              >
                {title && (
                  <h2
                    id="dialog-title"
                    className={`text-lg font-semibold ${theme ? theme.text : "text-foreground"}`}
                  >
                    {title}
                  </h2>
                )}
                <button
                  onClick={onClose}
                  className={`p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity ${theme ? theme.text : "text-foreground"}`}
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5 icon-dynamic" />
                </button>
              </div>
            )}

            <div
              className={
                size === "sidebar-left" || size === "sidebar-right"
                  ? "flex-1 overflow-y-auto p-4"
                  : ""
              }
            >
              {description && (
                <p
                  id="dialog-description"
                  className={`text-sm mb-6 ${theme ? theme.textSecondary : "text-muted-foreground"}`}
                >
                  {description}
                </p>
              )}

              {children}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

EnhancedDialog.displayName = "EnhancedDialog";
