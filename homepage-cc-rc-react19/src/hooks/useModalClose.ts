import { useRef, useEffect } from "react";

export const useModalClose = (
  isOpen: boolean,
  onClose: () => void,
  triggerRef: React.RefObject<
    HTMLElement | HTMLButtonElement | null
  > | null = null,
) => {
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        // Don't close if clicking the trigger element
        if (
          triggerRef?.current &&
          triggerRef.current.contains(e.target as Node)
        ) {
          return;
        }
        onClose();
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      // Close on focus leaving the modal area (with small delay for focus transitions)
      if (
        modalRef.current &&
        !modalRef.current.contains(e.relatedTarget as Node)
      ) {
        setTimeout(() => {
          if (
            modalRef.current &&
            !modalRef.current.contains(document.activeElement)
          ) {
            onClose();
          }
        }, 10);
      }
    };

    // Add all listeners
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [isOpen, onClose, triggerRef]);

  return modalRef;
};
