// import { useEffect, useState } from "react";
// import { PrimaryColor } from "@/context/constants";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// const Index: React.FC = () => {
//   const [showButton, setShowButton] = useState<boolean>(false);
//   const scroller =
//     typeof document !== "undefined"
//       ? document.getElementById("scrollplz")
//       : null;

//   const toggleVisibility = () => {
//     if (scroller?.scrollTop && scroller.scrollTop > 10) {
//       setShowButton(true);
//     } else {
//       setShowButton(false);
//     }
//   };

//   useEffect(() => {
//     if (scroller) {
//       scroller.addEventListener("scroll", toggleVisibility);
//     }
//     return () => {
//       scroller?.removeEventListener("scroll", toggleVisibility);
//     };
//   }, [scroller]);

//   const scrollToTop = () => {
//     scroller?.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//     setShowButton(false);
//   };

//   return (
//     <>
//       {showButton && (
//         <div
//           onClick={scrollToTop}
//           className="text-textColor absolute flex h-14 w-14 cursor-pointer justify-center rounded-full p-3 align-middle shadow-md"
//           style={{
//             bottom: 50,
//             right: 300,
//             background: PrimaryColor,
//           }}
//         >
//           <ArrowUpwardIcon fontSize="large" />
//         </div>
//       )}
//     </>
//   );
// };

// export default Index;
"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@acme/ui";

import { Button } from "../button";

interface BackToTopProps {
  threshold?: number;
  smooth?: boolean;
  className?: string;
}

export default function BackToTop({
  threshold = 300,
  smooth = true,
  className,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "fixed bottom-4 right-4 rounded-full p-2 shadow-md transition-opacity duration-300",
        className,
      )}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
}
// USE:
