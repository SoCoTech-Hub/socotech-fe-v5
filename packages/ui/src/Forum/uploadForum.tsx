"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Loader2, PinIcon } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Checkbox } from "../checkbox";
import { useToast } from "../hooks/use-toast";
import { Input } from "../input";
import { Label } from "../label";
import MdxEditor from "../MdxEditor";

interface UploadForumProps {
  userId: number;
  isAdmin: boolean;
}

const UploadForum: React.FC<UploadForumProps> = ({ userId, isAdmin }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !description.trim()) {
        toast({
          title: "Error",
          description: "Please provide both a title and a description.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);

      try {
        const response = await fetch("/api/forums", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            title: title.trim(),
            description: description.trim(),
            isPinned,
          }),
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Topic posted successfully",
          });
          await router.push("/forums");
        } else {
          throw new Error("Failed to post topic");
        }
      } catch (error) {
        console.error("Error creating topic:", error);
        toast({
          title: "Error",
          description: "Failed to post topic. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [userId, title, description, isPinned, router, toast],
  );

  // Handle cancel button click
  const handleCancel = useCallback(async () => {
    await router.push("/forums");
  }, [router]);

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create a New Topic</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={74}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <MdxEditor
              value={description}
              setValue={setDescription}
              placeholder="Write your topic description here..."
            />
          </div>
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pinned"
                checked={isPinned}
                onCheckedChange={(checked) => setIsPinned(checked as boolean)}
              />
              <Label
                htmlFor="pinned"
                className="flex cursor-pointer items-center space-x-2"
              >
                <PinIcon className="h-4 w-4" />
                <span>Pin this Topic</span>
              </Label>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !title.trim() || !description.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Topic"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UploadForum;
