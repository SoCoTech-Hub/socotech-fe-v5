"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from ".";
import { Button } from "./button";

interface ExpandableContentProps {
  content: string;
  maxHeight?: number;
  className?: string;
}

export function ExpandableContent({
  content,
  maxHeight = 100,
  className,
}: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setShowButton(contentRef.current.scrollHeight > maxHeight);
    }
  }, [content, maxHeight]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-300",
          !isExpanded && `max-h-[${maxHeight}px]`,
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
      {!isExpanded && showButton && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      )}
    </div>
  );
}
