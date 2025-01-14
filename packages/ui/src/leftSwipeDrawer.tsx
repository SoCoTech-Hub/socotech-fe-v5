"use client";

import type { PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useDragControls } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface LeftSwipeDrawerProps {
  children: React.ReactNode;
  drawerContent: React.ReactNode;
  drawerWidth?: string;
  dragHandleWidth?: number;
}

export function LeftSwipeDrawer({
  children = <div>Main Content</div>,
  drawerContent = <div>Drawer Content</div>,
  drawerWidth = "80%",
  dragHandleWidth = 20,
}: LeftSwipeDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    void controls.start(isOpen ? "open" : "closed");
  }, [isOpen, controls]);

  const handleDragEnd = (_event: PointerEvent, info: PanInfo) => {
    setIsOpen(info.offset.x > 50);
  };

  return (
    <div className="relative overflow-hidden" ref={constraintsRef}>
      <motion.div
        className="fixed inset-y-0 right-0 z-40 bg-primary shadow-lg"
        initial="closed"
        animate={controls}
        variants={{
          open: { x: 0 },
          closed: { x: `-${drawerWidth}` },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ width: drawerWidth }}
        drag="x"
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <div className="h-full overflow-y-auto p-4">{drawerContent}</div>
        <button
          className="absolute -right-6 top-1/2 -translate-y-1/2 transform rounded-r-full bg-primaryForeground p-2 text-primaryForeground"
          onClick={toggleDrawer}
          aria-label={isOpen ? "Close drawer" : "Open drawer"}
        >
          <ChevronRight
            className={`h-6 w-6 transition-transform ${isOpen ? "rotate-180" : ""} fill-white`}
          />
        </button>
      </motion.div>
      <div
        className="fixed inset-y-0 left-0 z-30"
        onPointerDown={(e) => dragControls.start(e)}
        style={{ width: dragHandleWidth }}
      />
      <div
        className={`min-h-screen transition-all ${isOpen ? `ml-[${drawerWidth}]` : ""}`}
      >
        {children}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={toggleDrawer}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
