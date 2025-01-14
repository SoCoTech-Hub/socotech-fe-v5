//TODO:fix like button and data fetch and push
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  MessageSquare,
  ThumbsUp
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Textarea } from "../textarea";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  likes: number;
}

const ForumPost = {
  id: "1",
  title: "How to optimize React performance?",
  content:
    "I'm working on a large React application and I'm noticing some performance issues. What are some best practices for optimizing React performance?",
  author: "reactDev",
  createdAt: new Date("2023-06-15T10:00:00"),
  likes: 25,
  replies: [
    {
      id: "1",
      content:
        "Use React.memo for functional components that render often with the same props.",
      author: "perfGuru",
      createdAt: new Date("2023-06-15T11:30:00"),
      likes: 12,
    },
    {
      id: "2",
      content:
        "Implement virtualization for long lists using libraries like react-window.",
      author: "listMaster",
      createdAt: new Date("2023-06-15T12:45:00"),
      likes: 8,
    },
    {
      id: "3",
      content:
        "Avoid unnecessary re-renders by using useCallback and useMemo hooks.",
      author: "hookExpert",
      createdAt: new Date("2023-06-15T14:20:00"),
      likes: 15,
    },
  ],
};

export const ForumPostView = (postData: ForumPost) => {
  const [post, setPost] = useState<ForumPost>(postData);
  const [newReply, setNewReply] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "mostLiked">(
    "newest",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const repliesPerPage = 5;

  const handleAddReply = () => {
    if (newReply.trim()) {
      const reply: Reply = {
        id: (post.replies.length + 1).toString(),
        content: newReply.trim(),
        author: "currentUser",
        createdAt: new Date(),
        likes: 0,
      };
      setPost((prevPost) => ({
        ...prevPost,
        replies: [reply, ...prevPost.replies],
      }));
      setNewReply("");
    }
  };

  const handleLike = (isPost: boolean, id: string) => {
    if (isPost) {
      setPost((prevPost) => ({ ...prevPost, likes: prevPost.likes + 1 }));
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        replies: prevPost.replies.map((reply) =>
          reply.id === id ? { ...reply, likes: reply.likes + 1 } : reply,
        ),
      }));
    }
  };

  const sortedReplies = [...post.replies].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime();
      case "mostLiked":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const indexOfLastReply = currentPage * repliesPerPage;
  const indexOfFirstReply = indexOfLastReply - repliesPerPage;
  const currentReplies = sortedReplies.slice(
    indexOfFirstReply,
    indexOfLastReply,
  );
  const pageCount = Math.ceil(sortedReplies.length / repliesPerPage);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`}
            />
            <AvatarFallback>
              {post.author[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </p>
            </div>
            <p className="text-sm">{post.content}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLike(true, post.id)}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Like ({post.likes})
          </Button>
          <p className="text-sm text-muted-foreground">
            <MessageSquare className="inline w-4 h-4 mr-2" />
            {post.replies.length} replies
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Replies</h3>
            <Select
              value={sortOrder}
              onValueChange={(value: "newest" | "oldest" | "mostLiked") =>
                setSortOrder(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort replies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="mostLiked">Most liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {currentReplies.map((reply) => (
            <div key={reply.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${reply.author}`}
                />
                <AvatarFallback>
                  {reply.author[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{reply.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(reply.createdAt, { addSuffix: true })}
                  </p>
                </div>
                <p className="text-sm">{reply.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(false, reply.id)}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Like ({reply.likes})
                </Button>
              </div>
            </div>
          ))}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, pageCount))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-4">
          <Textarea
            placeholder="Write your reply..."
            value={newReply}
            onChange={(e) => setNewReply(e.target.value.slice(0, 75))} // Limits input to 75 characters
            maxLength={75} // Provides a visual cue to users about the character limit
          />

          <Button onClick={handleAddReply} disabled={!newReply.trim()}>
            Post Reply
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

