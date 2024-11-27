"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

import type { EmailProps } from "./view";
import { Button } from "../button";
import { Input } from "../input";
import InmailComposer from "./composer";
import InmailList from "./list";
import InmailSidebar from "./sidebar";
import InmailView from "./view";

// Mock data structure for emails //TODO:fetch Emails
const initialEmails = [
  {
    id: 1,
    from: "john@example.com",
    subject: "Meeting tomorrow",
    body: "Hi, let's meet tomorrow at 2 PM.",
    starred: false,
    important: true,
    trash: false,
  },
  {
    id: 2,
    from: "jane@example.com",
    subject: "Project update",
    body: "Here's the latest update on our project.",
    starred: true,
    important: false,
    trash: false,
  },
  {
    id: 3,
    from: "boss@example.com",
    subject: "Urgent: Report needed",
    body: "Please send me the quarterly report ASAP.",
    starred: false,
    important: true,
    trash: false,
  },
  {
    id: 4,
    from: "newsletter@example.com",
    subject: "Weekly Newsletter",
    body: "Check out our latest news and updates!",
    starred: false,
    important: false,
    trash: true,
  },
];

export default function EmailApp() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedSection, setSelectedSection] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailProps | null>(null);
  const [composing, setComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const filteredEmails = emails
    .filter((email) => {
      if (selectedSection === "inbox") return !email.trash;
      if (selectedSection === "trash") return email.trash;
      if (selectedSection === "starred") return email.starred;
      if (selectedSection === "important") return email.important;
      return true;
    })
    .filter((email) =>
      [email.from, email.subject, email.body].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );

  const updateEmail = (id: number, updates: Partial<EmailProps>) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, ...updates } : email,
      ),
    );
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const trashEmail = (id: number) => updateEmail(id, { trash: true });
  const untrashEmail = (id: number) => updateEmail(id, { trash: false });
  const starEmail = (id: number) =>
    updateEmail(id, { starred: !emails.find((e) => e.id === id)?.starred });

  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setAttachment(event.target.files[0] ?? null);
    }
  };

  const toggleMenuCollapse = () => {
    setIsMenuCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Collapsible Side Menu for all screen sizes */}
      <InmailSidebar
        setSelectedSection={setSelectedSection}
        setComposing={setComposing}
        isCollapsed={isMenuCollapsed}
        toggleCollapse={toggleMenuCollapse}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-white p-4">
          <Input
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" className="ml-2">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {/* Email List and View */}
        <div className="flex flex-1 overflow-hidden">
          {/* Email List */}
          <InmailList
            emails={filteredEmails}
            onSelectEmail={setSelectedEmail}
            onStarEmail={starEmail}
            onTrashEmail={(id) =>
              filteredEmails.find((e) => e.id === id)?.trash
                ? untrashEmail(id)
                : trashEmail(id)
            }
          />

          {/* Email View */}
          {selectedEmail && (
            <div className="flex-1">
              <InmailView
                email={selectedEmail}
                onStar={starEmail}
                onTrash={selectedEmail.trash ? untrashEmail : trashEmail}
                onClose={() => setSelectedEmail(null)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Email Composer */}
      {composing && (
        <InmailComposer
          setComposing={setComposing}
          handleAttachment={handleAttachment}
          attachments={attachment}
        />
      )}
    </div>
  );
}
