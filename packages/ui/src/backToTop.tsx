"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "./button";
import { cn } from "./utils";

export interface BackToTopProps extends React.HTMLAttributes<HTMLDivElement> {
  threshold?: number;
}

export function BackToTop({
  threshold = 300,
  className = "bg-white text-primary hover:bg-primary hover:text-white",
  ...props
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: number;

    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        timeout = window.requestAnimationFrame(() => setIsVisible(true));
      } else {
        timeout = window.requestAnimationFrame(() => setIsVisible(false));
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.cancelAnimationFrame(timeout);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {isVisible && "Back to top button is visible"}
      </div>
      {isVisible && (
        <div
          className={cn(
            "fixed bottom-4 right-4 z-50 transition-opacity duration-300",
            className,
          )}
          {...props}
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md hover:shadow-lg"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
}
