"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

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
import { MDXEditor } from "../Mdx/editor";

interface Message {
  id: number;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
  attachment?: string;
}

export interface TicketDetailProps {
  ticket: {
    id: number;
    title: string;
    description: string;
    status: string;
    created: string;
    location: string;
  };
  messageList?: Message[];
  sendMessage?: (e: Message) => void;
}

export function TicketDetail({
  ticket,
  messageList,
  sendMessage,
}: TicketDetailProps) {
  const [messages, setMessages] = useState<Message[]>(messageList || []);
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
      sendMessage?.(message);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
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
                        <Paperclip className="mr-1 h-4 w-4" />
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
          <MDXEditor initialValue={newMessage} onSave={setNewMessage} />
          <div className="flex items-center justify-between">
            <Button variant="outline">
              <Paperclip className="mr-2 h-4 w-4" />
              Attach File
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
