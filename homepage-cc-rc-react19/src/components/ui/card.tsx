import * as React from "react";
import { cn } from "@/utils/cn";
import { Theme } from "@/styles/themes";
import { getCardStyles } from "@/utils/themeUtils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
  ref?: React.Ref<HTMLDivElement>;
}

const Card = ({ className, theme, ref, ...props }: CardProps) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border shadow-sm",
      theme ? getCardStyles(theme) : "",
      className,
    )}
    {...props}
  />
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const CardHeader = ({ className, ref, ...props }: CardHeaderProps) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  theme?: Theme;
  ref?: React.Ref<HTMLHeadingElement>;
}

const CardTitle = ({ className, theme, ref, ...props }: CardTitleProps) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      theme ? theme.text : "",
      className,
    )}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  theme?: Theme;
  ref?: React.Ref<HTMLParagraphElement>;
}

const CardDescription = ({
  className,
  theme,
  ref,
  ...props
}: CardDescriptionProps) => (
  <p
    ref={ref}
    className={cn(
      "text-sm",
      theme ? theme.textSecondary : "text-muted-foreground",
      className,
    )}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const CardContent = ({ className, ref, ...props }: CardContentProps) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const CardFooter = ({ className, ref, ...props }: CardFooterProps) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
