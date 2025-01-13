import { cn } from "./utils";

export interface SpinningLoaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function SpinningLoader({
  size = "md",
  color = "text-primary",
  className,
  ...props
}: SpinningLoaderProps) {
  const sizeClasses = cn({
    "h-6 w-6 border-2": size === "sm",
    "border-3 h-10 w-10": size === "md",
    "h-16 w-16 border-4": size === "lg",
  });

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        sizeClasses,
        color,
        className,
      )}
      role="status"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
