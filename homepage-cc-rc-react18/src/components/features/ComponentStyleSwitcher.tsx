import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  ComponentStyle,
  ComponentStyleConfig,
  componentStyles,
} from "@/hooks/useComponentStyle";
import { Theme } from "@/types/theme";

interface ComponentStyleSwitcherProps {
  currentStyle: ComponentStyle;
  onStyleChange: (style: ComponentStyle) => void;
  isLoading: boolean;
  theme: Theme;
}

/**
 * Component style switcher dropdown for selecting different UI component variants.
 * Provides options for Default, Enhanced, Minimal, and Professional component styles.
 */
export const ComponentStyleSwitcher: React.FC<ComponentStyleSwitcherProps> = ({
  currentStyle,
  onStyleChange,
  isLoading,
  theme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const styleOptions = Object.entries(componentStyles) as [
    ComponentStyle,
    ComponentStyleConfig,
  ][];

  const currentStyleConfig = componentStyles[currentStyle];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % styleOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(
          (prev) => (prev - 1 + styleOptions.length) % styleOptions.length,
        );
        break;
      case "Enter":
      case " ": {
        e.preventDefault();
        const [selectedStyle] = styleOptions[focusedIndex];
        onStyleChange(selectedStyle);
        setIsOpen(false);
        break;
      }
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

  const handleStyleSelect = (style: ComponentStyle) => {
    onStyleChange(style);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm",
          "border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1",
          theme.isDark
            ? `${theme.surface} ${theme.border} ${theme.text} hover:bg-gray-700 focus:ring-blue-400`
            : `bg-white ${theme.border} ${theme.text} hover:bg-gray-50 focus:ring-blue-500`,
          isLoading && "opacity-50 cursor-not-allowed",
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Component style selector. Current: ${currentStyleConfig.name}`}
      >
        <span className="flex flex-col items-start">
          <span className="font-medium">{currentStyleConfig.name}</span>
          <span className={cn("text-xs", theme.textMuted)}>
            {currentStyleConfig.description}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180",
            isLoading && "animate-spin",
          )}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          aria-label="Component style options"
          className={cn(
            "absolute z-10 w-full bottom-full mb-1 rounded-md shadow-lg border",
            "max-h-60 overflow-auto py-1",
            theme.isDark
              ? `${theme.surface} ${theme.border} shadow-black/20`
              : `bg-white ${theme.border} shadow-gray-200/50`,
          )}
        >
          {styleOptions.map(([styleKey, config], index) => (
            <button
              key={styleKey}
              onClick={() => handleStyleSelect(styleKey)}
              className={cn(
                "w-full px-3 py-2 text-left text-sm transition-colors",
                "focus:outline-none",
                currentStyle === styleKey
                  ? theme.isDark
                    ? "bg-blue-900/50 text-blue-300"
                    : "bg-blue-50 text-blue-900"
                  : theme.isDark
                    ? `${theme.text} hover:bg-gray-700 focus:bg-gray-700`
                    : `${theme.text} hover:bg-gray-100 focus:bg-gray-100`,
                focusedIndex === index && "ring-2 ring-inset ring-blue-500",
              )}
              role="option"
              aria-selected={currentStyle === styleKey}
            >
              <div className="flex flex-col">
                <span className="font-medium">{config.name}</span>
                <span className={cn("text-xs", theme.textMuted)}>
                  {config.description}
                </span>
                <span
                  className={cn(
                    "text-xs mt-1 px-2 py-0.5 rounded-full inline-block w-fit",
                    theme.isDark
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-600",
                  )}
                >
                  {config.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
