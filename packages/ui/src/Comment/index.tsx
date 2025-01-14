"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ScrollArea } from "../scroll-area";
import { SpinningLoader } from "../spinningLoader";
import { Textarea } from "../textarea";

interface Comment {
  id: number;
  author: User;
  content: string;
  created_at: string;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}
export interface CommentComponentProps {
  comments?: Comment[]; // Initial comments
  onFetchComments?: () => Promise<Comment[]>; // Fetch comments handler
  onPostComment?: (newComment: Comment) => Promise<Comment>; // Post comment handler
  className?: string; // Additional class names
  user?: User;
}

export function CommentComponent({
  comments: initialComments = [],
  onFetchComments,
  onPostComment,
  className,
  user,
}: CommentComponentProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom of the comments when a new comment is added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [comments]);

  // Fetch initial comments
  useEffect(() => {
    if (onFetchComments) {
      setLoading(true);
      onFetchComments()
        .then((fetchedComments) => setComments(fetchedComments))
        .catch(() => setError("Failed to load comments."))
        .finally(() => setLoading(false));
    }
  }, [onFetchComments]);

  // Handle form submission to add a new comment
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (newComment.trim() && onPostComment) {
        setLoading(true);
        const comment: Comment = {
          id: Date.now(),
          author: {
            id: user?.id || 0,
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            avatar: user?.avatar || "",
          },
          content: newComment.trim(),
          created_at: new Date().toISOString(),
        };

        try {
          const res = await onPostComment(comment);
          setComments((prevComments) => [...prevComments, res]);
          setNewComment("");
        } catch {
          setError("Failed to post the comment.");
        } finally {
          setLoading(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newComment, onPostComment],
  );

  return (
    <Card className={`mx-auto w-full max-w-2xl p-4 ${className}`}>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <SpinningLoader size="sm" />}
        {error && <p className="text-red-500">{error}</p>}
        <ScrollArea className="mb-4 h-[300px]" ref={scrollAreaRef}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4 flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={comment.author.avatar}
                    alt={comment.author.firstName}
                  />
                  <AvatarFallback>{comment.author.firstName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{`${comment.author.firstName} ${comment.author.lastName}`}</p>
                  <p className="text-sm text-gray-500">{comment.content}</p>
                  <p className="text-xs text-gray-400">
                    {format(new Date(comment.created_at), "PPpp")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full"
            disabled={loading}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!newComment.trim() || loading}
          >
            Post Comment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
