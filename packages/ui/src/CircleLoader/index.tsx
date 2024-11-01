// import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress"
// import { useStylesFacebook } from "./styles"

// const CircleLoader: React.FC<CircularProgressProps> = (props) => {
//   const classes = useStylesFacebook()

//   return (
//     <div className="ml-2">
//       <div className={classes.root}>
//         <CircularProgress
//           variant="determinate"
//           className={classes.bottom}
//           size={20}
//           thickness={4}
//           {...props}
//           value={100}
//         />
//         <CircularProgress
//           variant="indeterminate"
//           disableShrink
//           className={classes.top}
//           classes={{
//             circle: classes.circle,
//           }}
//           size={20}
//           thickness={4}
//           {...props}
//         />
//       </div>
//     </div>
//   )
// }

// export default CircleLoader

import React from "react";

import { cn } from "@acme/ui";

interface CircleLoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
  className?: string;
}

export default function CircleLoader({
  size = "md",
  color = "primary",
  className,
}: CircleLoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const colorClasses = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-transparent",
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
