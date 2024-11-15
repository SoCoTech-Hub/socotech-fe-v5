import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Send,
  Star,
  Trash2,
} from "lucide-react";

import { Button } from "../button";

export interface InmailSidebarProps {
  setComposing: (e: boolean) => void;
  setSelectedSection: (e: string) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const InmailSidebar: React.FC<InmailSidebarProps> = ({
  setSelectedSection,
  setComposing,
  isCollapsed,
  toggleCollapse,
}) => (
  <div
    className={`bg-white p-4 transition-all duration-300 ease-in-out ${isCollapsed ? "w-16" : "w-64"}`}
  >
    <Button
      className={`mb-4 w-full ${isCollapsed ? "px-2" : ""}`}
      onClick={() => setComposing(true)}
    >
      {isCollapsed ? <Send className="h-4 w-4" /> : "Compose"}
    </Button>
    <nav className="space-y-2">
      <Button
        variant="ghost"
        className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
        onClick={() => setSelectedSection("inbox")}
      >
        <Inbox className="h-4 w-4" />
        {!isCollapsed && <span className="ml-2">Inbox</span>}
      </Button>
      <Button
        variant="ghost"
        className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
        onClick={() => setSelectedSection("trash")}
      >
        <Trash2 className="h-4 w-4" />
        {!isCollapsed && <span className="ml-2">Trash</span>}
      </Button>
      <Button
        variant="ghost"
        className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
        onClick={() => setSelectedSection("starred")}
      >
        <Star className="h-4 w-4" />
        {!isCollapsed && <span className="ml-2">Starred</span>}
      </Button>
      <Button
        variant="ghost"
        className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
        onClick={() => setSelectedSection("important")}
      >
        <AlertCircle className="h-4 w-4" />
        {!isCollapsed && <span className="ml-2">Important</span>}
      </Button>
    </nav>
    <Button variant="ghost" className="mt-4 w-full" onClick={toggleCollapse}>
      {isCollapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </Button>
  </div>
);

export default InmailSidebar;
