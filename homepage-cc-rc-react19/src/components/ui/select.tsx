import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { Theme } from "@/styles/themes";
import { getSelectStyles } from "@/utils/themeUtils";

export interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  theme?: Theme;
}

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  theme?: Theme;
}

export interface SelectContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  theme?: Theme;
}

export interface SelectItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  value: string;
  onValueChange?: (value: string) => void;
  setIsOpen?: (open: boolean) => void;
  theme?: Theme;
}

export const Select: React.FC<SelectProps> = ({
  children,
  value,
  onValueChange,
  theme,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on ESC key or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            value,
            onValueChange,
            isOpen,
            setIsOpen,
            theme,
          });
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className, children, isOpen, setIsOpen, theme, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
      theme
        ? getSelectStyles(theme)
        : "border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      className,
    )}
    onClick={() => setIsOpen?.(!isOpen)}
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    {...props}
  >
    {children}
    <ChevronDown
      className={cn(
        "h-4 w-4 transition-transform",
        isOpen && "rotate-180",
        theme ? theme.textMuted : "opacity-50",
      )}
    />
  </button>
));

export const SelectValue: React.FC<{
  placeholder?: string;
  value?: string;
}> = ({ placeholder, value }) => (
  <span className={cn("block truncate", !value && "text-muted-foreground")}>
    {value || placeholder}
  </span>
);

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  SelectContentProps
>(({ className, children, isOpen, theme, ...props }, ref) =>
  isOpen ? (
    <div
      ref={ref}
      className={cn(
        "absolute top-full z-50 min-w-[8rem] overflow-hidden rounded-md p-1 shadow-lg border",
        theme
          ? `${theme.surface} ${theme.border} ${theme.text}`
          : "bg-popover text-popover-foreground border-border",
        className,
      )}
      role="listbox"
      {...props}
    >
      {children}
    </div>
  ) : null,
);

export const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  (
    { className, children, value, onValueChange, setIsOpen, theme, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        theme
          ? `${theme.text} hover:${theme.accent} focus:${theme.accent}`
          : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      onClick={() => {
        onValueChange?.(value);
        setIsOpen?.(false);
      }}
      role="option"
      {...props}
    >
      {children}
    </button>
  ),
);

SelectTrigger.displayName = "SelectTrigger";
SelectContent.displayName = "SelectContent";
SelectItem.displayName = "SelectItem";
