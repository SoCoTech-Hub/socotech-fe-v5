import { useState } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "../utils";

export interface IFrameProps {
  src: string;
  title: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  allowFullScreen?: boolean;
  sandbox?: string;
}

export function IFrame({
  src,
  title,
  width = "100%",
  height = "400px",
  className,
  allowFullScreen = false,
  sandbox = "allow-scripts allow-same-origin",
}: IFrameProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      )}
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        className={cn("border-0", isLoading ? "invisible" : "visible")}
        allowFullScreen={allowFullScreen}
        sandbox={sandbox}
        onLoad={handleLoad}
      />
    </div>
  );
}
