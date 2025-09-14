import { useState, useCallback } from "react";

/**
 * Interface defining the state and handlers for a modal.
 */
interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Custom hook for managing multiple modal states with consistent interface.
 * Provides a clean API for opening, closing, and toggling modals.
 *
 * @param initialStates - Object mapping modal names to their initial open/closed state
 * @returns Object mapping modal names to their state and control functions
 */
export const useModalManager = (
  initialStates: Record<string, boolean> = {},
) => {
  const [modalStates, setModalStates] = useState(initialStates);

  /**
   * Opens a specific modal by name.
   *
   * @param modalName - The name/key of the modal to open
   */
  const openModal = useCallback((modalName: string) => {
    setModalStates((prev) => ({ ...prev, [modalName]: true }));
  }, []);

  /**
   * Closes a specific modal by name.
   *
   * @param modalName - The name/key of the modal to close
   */
  const closeModal = useCallback((modalName: string) => {
    setModalStates((prev) => ({ ...prev, [modalName]: false }));
  }, []);

  /**
   * Toggles a specific modal's state.
   *
   * @param modalName - The name/key of the modal to toggle
   */
  const toggleModal = useCallback((modalName: string) => {
    setModalStates((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  }, []);

  /**
   * Closes all managed modals.
   */
  const closeAllModals = useCallback(() => {
    setModalStates((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: false,
        }),
        {},
      ),
    );
  }, []);

  // Create modal objects with consistent interface
  const modals = Object.keys(modalStates).reduce(
    (acc, modalName) => ({
      ...acc,
      [modalName]: {
        isOpen: modalStates[modalName] || false,
        open: () => openModal(modalName),
        close: () => closeModal(modalName),
        toggle: () => toggleModal(modalName),
      },
    }),
    {} as Record<string, ModalState>,
  );

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,
    modalStates,
  };
};
