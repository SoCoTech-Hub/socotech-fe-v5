"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "../button";
import { Input } from "../input";
import { AttachmentType } from "./attachments";
import { InmailComposer } from "./composer";
import { InmailList } from "./list";
import { InmailSidebar } from "./sidebar";
import { EmailProps, InmailView } from "./view";

const initialEmails: EmailProps[] = [
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

export function EmailApp() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedSection, setSelectedSection] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailProps | null>(null);
  const [composing, setComposing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [attachments, setAttachments] = useState<AttachmentType[]>([]);
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
      const newAttachments = Array.from(event.target.files).map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
      }));
      setAttachments((prev) => [...prev, ...newAttachments]);
    }
  };

  const toggleMenuCollapse = () => {
    setIsMenuCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <InmailSidebar
        setSelectedSection={setSelectedSection}
        setComposing={setComposing}
        isCollapsed={isMenuCollapsed}
        toggleCollapse={toggleMenuCollapse}
      />

      <div className="flex flex-1 flex-col">
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

        <div className="flex flex-1 overflow-hidden">
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

      {composing && (
        <InmailComposer
          setComposing={setComposing}
          handleAttachment={handleAttachment}
          attachments={attachments}
        />
      )}
    </div>
  );
}
