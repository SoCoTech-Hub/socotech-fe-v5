import { cn } from ".";

interface NotificationDotProps {
  active?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "destructive";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
}

export default function NotificationDot({
  active = true,
  size = "md",
  color = "primary",
  position = "top-right",
  className,
}: NotificationDotProps) {
  if (!active) return null;

  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    destructive: "bg-destructive",
  };

  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  return (
    <div className="relative inline-flex">
      <div
        className={cn(
          "absolute z-10 animate-pulse rounded-full",
          sizeClasses[size],
          colorClasses[color],
          positionClasses[position],
          className,
        )}
      />
    </div>
  );
}
