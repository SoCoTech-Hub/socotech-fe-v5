"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Download,
  FileText,
  MessageSquare,
  Play,
  Share2,
  Star,
  ThumbsUp,
} from "lucide-react";

import HeaderSection from "./viewHeader";
import HeaderImage from "./viewHeaderImage";

interface Comment {
  id: string;
  user: string;
  content: string;
  date: string;
  rating: number;
  likes: number;
}

interface ViewProps {
  id: string;
  subject: string;
  title: string;
  overview: string;
  duration: string;
  presenter: string;
  videoUrl: string;
  hasQuiz: boolean;
  progress?: number;
  headerImageUrl: string;
  headerImageAlt: string;
  commentsData: Comment[];
}

export default function ViewPage({
  subject,
  title,
  overview,
  duration,
  presenter,
  videoUrl,
  hasQuiz,
  progress = 0,
  headerImageUrl,
  headerImageAlt,
  commentsData,
}: ViewProps) {
  const [activeTab, setActiveTab] = useState("lesson");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(commentsData);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const submitRatingAndComment = () => {
    if (comment && rating > 0) {
      const newComment: Comment = {
        id: Date.now().toString(),
        user: "Current User", // In a real app, this would be the logged-in user's name
        content: comment,
        date: new Date().toISOString().split("T")[0],
        rating: rating,
        likes: 0,
      };
      setComments([newComment, ...comments]);
      setRating(0);
      setComment("");
    }
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment,
      ),
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header Image */}
      <HeaderImage
        headerImageAlt={headerImageAlt}
        headerImageUrl={headerImageUrl}
      />

      <div className="p-4 md:p-8">
        {/* Header */}
        <HeaderSection
          onBackClick={onBackClick}
          onShareClick={onShareClick}
          onTakeNotesClick={onTakeNotesClick}
          subject={subject}
          title={title}
        />

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-sm">{progress}% COMPLETED</p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="lesson">Lesson</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="lesson" className="space-y-8">
            {/* Lesson Overview */}
            <section>
              <h3 className="mb-4 text-lg font-semibold">Lesson Overview</h3>
              <p>{overview}</p>
              <div className="mt-4 flex flex-col sm:flex-row sm:gap-8">
                <div>
                  <span className="font-semibold">Duration:</span>
                  <span className="ml-2">{duration}</span>
                </div>
                <div>
                  <span className="font-semibold">Presented by:</span>
                  <span className="ml-2">{presenter}</span>
                </div>
              </div>
            </section>

            {/* Lesson Content */}
            <section>
              <h3 className="mb-4 text-lg font-semibold">Lesson Content</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Play className="h-5 w-5" />
                      <div>
                        <h4 className="font-medium">{subject} - Video</h4>
                        <p className="text-sm">{title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {hasQuiz && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5" />
                        <div>
                          <h4 className="font-medium">{subject} - Quiz</h4>
                          <p className="text-sm">Test your knowledge</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          </TabsContent>

          {/* Materials */}
          <TabsContent value="materials" className="space-y-4">
            <h3 className="mb-4 text-lg font-semibold">Helpful Materials</h3>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Download className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Lesson Summary PDF</h4>
                      <p className="text-sm">
                        Download the summary of key points
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <FileText className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Practice Exercises</h4>
                      <p className="text-sm">
                        Additional exercises for practice
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Comments Section */}
        <section className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Comments</h3>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="mb-4 border-b pb-4 last:border-b-0"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">{comment.user}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="mb-2">{comment.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= comment.rating
                            ? "fill-current text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </section>

        {/* Rating and Comment Section */}
        <section className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Rate this Lesson</h3>
          <div className="mb-4 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                onClick={() => handleRating(star)}
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= rating
                      ? "fill-current text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Leave a comment about this lesson"
            value={comment}
            onChange={handleComment}
            className="mb-4"
          />
          <Button onClick={submitRatingAndComment}>
            Submit Rating and Comment
          </Button>
        </section>
      </div>
    </div>
  );
}
