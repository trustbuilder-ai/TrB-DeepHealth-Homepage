import * as React from "react";
import { Theme } from "./theme";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  theme?: Theme;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  theme?: Theme;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: Theme;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  theme?: Theme;
}

export interface EnhancedProgressProps {
  value?: number;
  max?: number;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "success" | "warning" | "critical";
  showValue?: boolean;
  className?: string;
  [key: string]: unknown;
}

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

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "online" | "offline" | "busy" | "away";
  showText?: boolean;
  theme?: Theme;
}

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  theme?: Theme;
}

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme?: Theme;
}

export interface SelectContentProps {
  children: React.ReactNode;
  theme?: Theme;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "critical"
    | "info";
  theme?: Theme;
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export interface NotificationProps {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  onDismiss?: (id: string) => void;
}
