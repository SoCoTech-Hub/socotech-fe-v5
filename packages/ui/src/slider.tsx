"use client";

import React, { useRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "./utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  onValueCommit?: (value: number[]) => void; // New prop for finalized value
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, onValueCommit, onValueChange, ...props }, ref) => {
  const isDragging = useRef(false);

  const handlePointerUp = () => {
    if (isDragging.current && onValueCommit) {
      onValueCommit(props.value as number[]); // Final value
    }
    isDragging.current = false;
  };

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      onValueChange={onValueChange}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
