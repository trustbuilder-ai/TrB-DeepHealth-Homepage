import { useState, useCallback } from "react";

/**
 * Interface for notification objects.
 */
export interface NotificationItem {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

/**
 * Custom hook for managing application notifications.
 * Provides functionality to add, remove, and manage notification queue.
 *
 * @returns Object containing notification state and management functions
 */
export const useNotificationManager = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  /**
   * Adds a new notification to the queue with auto-generated ID.
   *
   * @param notification - Notification object without ID (will be auto-generated)
   */
  /**
   * Removes a notification from the queue by its ID.
   *
   * @param id - The unique identifier of the notification to remove
   */
  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const addNotification = useCallback(
    (notification: Omit<NotificationItem, "id">) => {
      const id = `notification-${Date.now()}-${Math.random()}`;
      const newNotification = { ...notification, id };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto-dismiss after 5 seconds for non-error notifications
      if (notification.type !== "error") {
        setTimeout(() => {
          dismissNotification(id);
        }, 5000);
      }
    },
    [dismissNotification],
  );

  /**
   * Clears all notifications from the queue.
   */
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Adds a success notification with predefined styling.
   *
   * @param title - Notification title
   * @param message - Notification message
   */
  const addSuccessNotification = useCallback(
    (title: string, message: string) => {
      addNotification({ type: "success", title, message });
    },
    [addNotification],
  );

  /**
   * Adds an error notification with predefined styling.
   * Error notifications do not auto-dismiss.
   *
   * @param title - Notification title
   * @param message - Notification message
   */
  const addErrorNotification = useCallback(
    (title: string, message: string) => {
      addNotification({ type: "error", title, message });
    },
    [addNotification],
  );

  /**
   * Adds a warning notification with predefined styling.
   *
   * @param title - Notification title
   * @param message - Notification message
   */
  const addWarningNotification = useCallback(
    (title: string, message: string) => {
      addNotification({ type: "warning", title, message });
    },
    [addNotification],
  );

  /**
   * Adds an info notification with predefined styling.
   *
   * @param title - Notification title
   * @param message - Notification message
   */
  const addInfoNotification = useCallback(
    (title: string, message: string) => {
      addNotification({ type: "info", title, message });
    },
    [addNotification],
  );

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAllNotifications,
    addSuccessNotification,
    addErrorNotification,
    addWarningNotification,
    addInfoNotification,
  };
};
