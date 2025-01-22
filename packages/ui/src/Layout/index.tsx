"use client";

import { useEffect, useState } from "react";

import { AppProvider } from "@acme/snippets";

import { LayoutNavbar } from "./navbar";
import { LayoutSidebar } from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSidebarExpanded = isMobile ? false : isExpanded;
  const toggleSidebar = () => setIsExpanded(!isSidebarExpanded);

  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-100">
        <LayoutSidebar
          isExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <LayoutNavbar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-6">
            {children}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
