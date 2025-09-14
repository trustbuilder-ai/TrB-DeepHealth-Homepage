import * as React from "react";
import { cn } from "@/utils/cn";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
  ref?: React.Ref<HTMLDivElement>;
}

const Alert = ({
  className,
  variant = "default",
  ref,
  ...props
}: AlertProps) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      "relative w-full rounded-lg border p-4",
      variant === "default" && "bg-background text-foreground",
      variant === "destructive" &&
        "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      className,
    )}
    {...props}
  />
);
Alert.displayName = "Alert";

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: React.Ref<HTMLHeadingElement>;
}

const AlertTitle = ({ className, ref, ...props }: AlertTitleProps) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
);
AlertTitle.displayName = "AlertTitle";

interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const AlertDescription = ({
  className,
  ref,
  ...props
}: AlertDescriptionProps) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
