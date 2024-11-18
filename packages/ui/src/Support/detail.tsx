"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import ReactQuill from "react-quill";

import { Avatar, AvatarFallback } from "../avatar";
import { Badge } from "../badge";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

import "react-quill/dist/quill.snow.css";

interface Message {
  id: number;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
  attachment?: string;
}

interface TicketDetailProps {
  ticket: {
    id: number;
    title: string;
    description: string;
    status: string;
    created: string;
    location: string;
  };
}
// TODO: Fetch ticket messages
const mockMessages: Message[] = [
  {
    id: 1,
    sender: "user",
    content: "I'm having trouble accessing my account. Can you help?",
    timestamp: "2023-06-01 10:00",
  },
  {
    id: 2,
    sender: "agent",
    content:
      "I'd be happy to help. Can you please provide more details about the issue you're experiencing?",
    timestamp: "2023-06-01 10:15",
  },
  {
    id: 3,
    sender: "user",
    content:
      "When I try to log in, it says 'Invalid credentials' even though I'm sure my password is correct.",
    timestamp: "2023-06-01 10:20",
  },
  {
    id: 4,
    sender: "agent",
    content:
      "I see. Let's try resetting your password. I'm sending you a password reset link to your registered email address.",
    timestamp: "2023-06-01 10:25",
    attachment: "password_reset.pdf",
  },
];

export default function TicketDetail({ ticket }: TicketDetailProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "user",
        content: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>
              Ticket #{ticket.id}: {ticket.title}
            </CardTitle>
            <CardDescription>
              Status: {ticket.status} | Created: {ticket.created}
            </CardDescription>
          </div>
          <Badge variant="outline">{ticket.location}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">Description</h3>
          <p className="text-sm text-gray-600">{ticket.description}</p>
        </div>
        <div className="mb-4 max-h-[400px] space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar>
                  <AvatarFallback>
                    {message.sender === "user" ? "U" : "A"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-2 ${message.sender === "user" ? "bg-blue-100" : "bg-gray-100"}`}
                >
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                  {message.attachment && (
                    <div className="mt-2">
                      <a href="#" className="flex items-center text-blue-500">
                        <Paperclip className="w-4 h-4 mr-1" />
                        {message.attachment}
                      </a>
                    </div>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <ReactQuill
            value={newMessage}
            onChange={setNewMessage}
            placeholder="Type your message..."
          />
          <div className="flex items-center justify-between">
            <Button variant="outline">
              <Paperclip className="w-4 h-4 mr-2" />
              Attach File
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
