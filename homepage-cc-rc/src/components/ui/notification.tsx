import React from "react";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/utils/cn";

export interface NotificationAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export interface NotificationProps {
  notification: {
    type: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    actions?: NotificationAction[];
  };
  onDismiss: () => void;
  className?: string;
}

export const Notification = React.memo<NotificationProps>(
  ({ notification, onDismiss, className }) => {
    const getNotificationIcon = (type: string) => {
      switch (type) {
        case "success":
          return <CheckCircle2 className="w-5 h-5" />;
        case "error":
          return <AlertTriangle className="w-5 h-5" />;
        case "warning":
          return <AlertCircle className="w-5 h-5" />;
        case "info":
          return <Info className="w-5 h-5" />;
        default:
          return <CheckCircle2 className="w-5 h-5" />;
      }
    };

    const getNotificationStyles = (type: string) => {
      switch (type) {
        case "success":
          return "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200";
        case "error":
          return "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200";
        case "warning":
          return "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200";
        case "info":
          return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200";
        default:
          return "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-200";
      }
    };

    return (
      <div
        className={cn(
          "fixed top-4 right-4 z-50 max-w-sm w-full notification-enter-active",
          className,
        )}
      >
        <div
          className={cn(
            "p-4 rounded-lg border shadow-lg transition-all duration-300",
            getNotificationStyles(notification.type),
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold mb-1">
                {notification.title}
              </h4>
              <p className="text-sm opacity-90">{notification.message}</p>
              {notification.actions && (
                <div className="flex gap-2 mt-3">
                  {notification.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className={cn(
                        "text-xs px-3 py-1 rounded-md font-medium transition-colors",
                        action.variant === "primary"
                          ? "bg-current text-white bg-opacity-20"
                          : "bg-white bg-opacity-20",
                      )}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={onDismiss}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  },
);
