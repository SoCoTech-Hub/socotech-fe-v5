"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from ".";
import { Button } from "./button";

export interface ExpandableContentProps {
  content: string;
  maxHeight?: number;
  className?: string;
}
//TODO: Check if max height works as expected, not working on storybook
export function ExpandableContent({
  content,
  maxHeight = 2,
  className,
}: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      // Calculate if content overflows based on scrollHeight and clientHeight
      const currentHeight = contentRef.current.clientHeight;
      const fullHeight = contentRef.current.scrollHeight;
      setShowButton(fullHeight > currentHeight);
    }
  }, [content, maxHeight]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded
            ? "line-clamp-none"
            : maxHeight > 6
              ? `line-clamp-[${maxHeight}]`
              : `line-clamp-${maxHeight}`,
        )}
      >
        {content}
      </div>
      {showButton && (
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        </div>
      )}
    </div>
  );
}
