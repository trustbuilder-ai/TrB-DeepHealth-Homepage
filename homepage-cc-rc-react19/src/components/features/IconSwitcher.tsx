import React, { useState, useRef } from "react";
import { Code, ChevronDown, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalClose } from "@/hooks/useModalClose";
import { type Theme } from "@/styles/themes";
import { cn } from "@/utils/cn";

// Icon sets configuration
const iconSets = {
  lucide: {
    name: "Lucide Icons",
    description: "Default clean SVG icons",
    strokeWidth: 2,
    type: "local",
  },
  heroicons: {
    name: "Heroicons",
    description: "Tailwind UI official icons",
    strokeWidth: 1.5,
    type: "external",
  },
  phosphor: {
    name: "Phosphor Icons",
    description: "Flexible icon family",
    strokeWidth: 2.5,
    type: "external",
  },
  feather: {
    name: "Feather Icons",
    description: "Simply beautiful icons",
    strokeWidth: 1.8,
    type: "external",
  },
  tabler: {
    name: "Tabler Icons",
    description: "Free SVG icons (3000+)",
    strokeWidth: 2,
    type: "external",
  },
  octicons: {
    name: "Octicons",
    description: "GitHub's icon set - clean and expressive",
    strokeWidth: 1.5,
    type: "external",
  },
};

export interface IconSwitcherProps {
  currentIconSet: string;
  onIconSetChange: (iconSet: string) => void;
  isLoading: boolean;
  loadedIconSets: Set<string>;
  theme: Theme;
}

export const IconSwitcher = ({
  currentIconSet,
  onIconSetChange,
  isLoading,
  loadedIconSets,
  theme,
}: IconSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useModalClose(isOpen, () => setIsOpen(false), triggerRef);
  const iconSet = iconSets[currentIconSet as keyof typeof iconSets];

  return (
    <div className="relative">
      <Button
        ref={triggerRef}
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        loading={isLoading}
        disabled={isLoading}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Current icon set: ${iconSet?.name || "Icons"}. Click to change icon set.`}
        className={cn(
          "gap-2",
          theme.isDark
            ? "border-slate-700 bg-slate-800 text-slate-300"
            : "border-slate-200",
        )}
      >
        <Code className="w-3 h-3" strokeWidth={iconSet?.strokeWidth || 2} />
        <span className="hidden sm:inline">
          {isLoading ? "Loading..." : iconSet?.name || "Icons"}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen ? "rotate-180" : "",
          )}
        />
      </Button>

      {isOpen && (
        <div
          ref={modalRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "absolute top-full right-0 mt-2 w-72 rounded-md shadow-xl z-50 border max-h-96 overflow-y-auto",
            theme.isDark
              ? "bg-slate-800 border-slate-700 shadow-black/30"
              : "bg-white border-slate-200 shadow-gray-900/20",
          )}
        >
          <div className="p-3">
            <div className="mb-3">
              <h4
                className={cn(
                  "text-xs font-semibold mb-2",
                  theme.isDark ? "text-slate-400" : "text-slate-600",
                )}
              >
                Icon Sets
              </h4>
              <p
                className={cn(
                  "text-xs mb-3",
                  theme.isDark ? "text-slate-500" : "text-slate-500",
                )}
              >
                Experiment with different icon styles and stroke weights
              </p>
            </div>

            {Object.entries(iconSets).map(([key, set]) => {
              const isLoaded = loadedIconSets.has(key);
              const isExternal = set.type === "external";

              return (
                <button
                  key={key}
                  onClick={() => {
                    onIconSetChange(key);
                    setIsOpen(false);
                  }}
                  disabled={isExternal && !isLoaded && isLoading}
                  aria-label={`Select ${set.name} icon set`}
                  className={cn(
                    "w-full text-left px-3 py-3 rounded-md transition-colors flex items-center gap-3 mb-2",
                    currentIconSet === key
                      ? theme.isDark
                        ? "bg-slate-700"
                        : "bg-slate-100"
                      : theme.isDark
                        ? "bg-transparent"
                        : "bg-transparent",
                    isExternal && !isLoaded && "opacity-75",
                  )}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Code className="w-4 h-4" strokeWidth={set.strokeWidth} />
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "text-sm font-medium flex items-center gap-2",
                          theme.isDark ? "text-slate-200" : "text-slate-900",
                        )}
                      >
                        {set.name}
                        {isExternal && (
                          <span
                            className={cn(
                              "text-xs px-1.5 py-0.5 rounded",
                              isLoaded
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700",
                            )}
                          >
                            {isLoaded ? "Loaded" : "External"}
                          </span>
                        )}
                      </div>
                      <div
                        className={cn(
                          "text-xs truncate",
                          theme.isDark ? "text-slate-400" : "text-slate-500",
                        )}
                      >
                        {set.description}
                      </div>
                      {set.strokeWidth > 0 && (
                        <div
                          className={cn(
                            "text-xs",
                            theme.isDark ? "text-slate-500" : "text-slate-400",
                          )}
                        >
                          Stroke: {set.strokeWidth}px
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentIconSet === key && (
                      <Check
                        className={cn(
                          "w-4 h-4",
                          theme.isDark ? "text-slate-400" : "text-slate-600",
                        )}
                        aria-label="Currently selected"
                      />
                    )}
                    {isExternal && !isLoaded && (
                      <Loader2
                        className="w-3 h-3 animate-spin text-orange-500"
                        aria-label="Loading icon set"
                      />
                    )}
                  </div>
                </button>
              );
            })}

            <div
              className={cn(
                "text-xs mt-3 pt-3 border-t",
                theme.isDark ? "text-slate-500" : "text-slate-400",
                theme.border,
              )}
            >
              Icon sets provide different visual styles and stroke weights
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

IconSwitcher.displayName = "IconSwitcher";
