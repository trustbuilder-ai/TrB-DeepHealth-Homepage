import * as React from "react";
import { cn } from "@/utils/cn";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const Avatar = ({ className, ref, ...props }: AvatarProps) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
);
Avatar.displayName = "Avatar";

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  ref?: React.Ref<HTMLImageElement>;
}

const AvatarImage = ({ className, alt, ref, ...props }: AvatarImageProps) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    alt={alt}
    {...props}
  />
);
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

const AvatarFallback = ({ className, ref, ...props }: AvatarFallbackProps) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
