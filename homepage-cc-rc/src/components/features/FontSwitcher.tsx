import React, { useState, useRef, useMemo } from "react";
import { FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalClose } from "@/hooks/useModalClose";
import { fontSets } from "@/utils/fonts";
import { type Theme } from "@/styles/themes";
import { cn } from "@/utils/cn";

export interface FontSwitcherProps {
  currentFont: string;
  onFontChange: (font: string) => void;
  isLoading: boolean;
  loadedFonts: Set<string>;
  theme: Theme;
}

export const FontSwitcher = React.memo<FontSwitcherProps>(
  ({ currentFont, onFontChange, isLoading, loadedFonts, theme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const modalRef = useModalClose(isOpen, () => setIsOpen(false), triggerRef);

    const font = fontSets[currentFont];

    // Group fonts by type
    const fontCategories = useMemo(
      () => ({
        "Sans-Serif": Object.entries(fontSets).filter(
          ([, f]) => f.type === "sans-serif",
        ),
        Accessibility: Object.entries(fontSets).filter(
          ([, f]) => f.type === "accessibility",
        ),
        Therapeutic: Object.entries(fontSets).filter(
          ([, f]) => f.type === "therapeutic",
        ),
      }),
      [],
    );

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
          aria-label={`Current font: ${font?.name || "Font"}. Click to change font.`}
          className={cn(
            "gap-2",
            theme.isDark
              ? "border-slate-700 bg-slate-800 text-slate-300"
              : "border-slate-200",
          )}
        >
          <FileText className="w-3 h-3" />
          <span className="hidden sm:inline">
            {isLoading ? "Loading..." : font?.name || "Font"}
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
              "absolute top-full right-0 mt-2 w-80 rounded-md shadow-xl z-50 border max-h-96 overflow-y-auto p-4",
              theme.isDark
                ? "bg-slate-800 border-slate-700 shadow-black/30"
                : "bg-white border-slate-200 shadow-gray-900/20",
            )}
            role="listbox"
            aria-label="Font selection"
          >
            <div className="space-y-4">
              {Object.entries(fontCategories).map(
                ([categoryName, fontList]) => (
                  <div key={categoryName}>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                      {categoryName}
                    </h3>
                    <div className="space-y-1">
                      {fontList.map(([key, fontData]) => (
                        <button
                          key={key}
                          onClick={() => {
                            onFontChange(key);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "w-full text-left p-3 rounded-md transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            currentFont === key &&
                              "bg-primary text-primary-foreground",
                          )}
                          role="option"
                          aria-selected={currentFont === key}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div
                                className="font-medium text-sm"
                                style={{ fontFamily: fontData.fontFamily }}
                              >
                                {fontData.name}
                              </div>
                              <div className="text-xs opacity-70">
                                {fontData.description}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {loadedFonts.has(key) && (
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                              )}
                              {fontData.accessibility && (
                                <div className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                                  A11y
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);
