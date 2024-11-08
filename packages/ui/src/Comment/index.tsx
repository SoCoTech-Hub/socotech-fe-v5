//TODO:fetch Data
"use client";

import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ScrollArea } from "../scroll-area";
import { Textarea } from "../textarea";

// Define the Comment type
interface Comment {
  id: number;
  author: string;
  content: string;
  avatar: string;
  timestamp: Date;
}

export default function Comment() {
  const [comments, setComments] = useState<Comment[]>([
    // {
    //   id: 1,
    //   author: "Alice",
    //   content: "Great post!",
    //   avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice",
    //   timestamp: new Date(),
    // },
    // {
    //   id: 2,
    //   author: "Bob",
    //   content: "I agree with Alice.",
    //   avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Bob",
    //   timestamp: new Date(),
    // },
  ]);
  const [newComment, setNewComment] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom of the comments when a new comment is added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [comments]);

  // Handle form submission to add a new comment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "You",
        content: newComment.trim(),
        avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=You",
        timestamp: new Date(),
      };
      setComments((prevComments) => [...prevComments, comment]);
      setNewComment("");
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl p-4">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="mb-4 h-[300px]" ref={scrollAreaRef}>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-sm text-gray-500">{comment.content}</p>
                <p className="text-xs text-gray-400">
                  {format(comment.timestamp, "PPpp")}{" "}
                  {/* Display the time the comment was posted */}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!newComment.trim()}
          >
            Post Comment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
