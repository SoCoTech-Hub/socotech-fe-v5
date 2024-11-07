"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Book, CheckCircle, Clock } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Progress } from "../progress";
import { Skeleton } from "../skeleton";

interface Lesson {
  id: string;
  title: string;
  status: "completed" | "in_progress" | "not_started";
  quizScore: number | null;
  completionRate: number;
}

interface UserReport {
  totalTimeSpent: number;
  lessonsCompleted: number;
  lessonsInProgress: number;
  lessons: Lesson[];
}

export default function ReportSection() {
  const [report, setReport] = useState<UserReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      // TODO: Fetch data
      // Simulate API call to fetch user report
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setReport({
        totalTimeSpent: 3600, // in seconds
        lessonsCompleted: 5,
        lessonsInProgress: 2,
        lessons: [
          {
            id: "1",
            title: "Introduction to React",
            status: "completed",
            quizScore: 90,
            completionRate: 100,
          },
          {
            id: "2",
            title: "State Management",
            status: "completed",
            quizScore: 85,
            completionRate: 100,
          },
          {
            id: "3",
            title: "Hooks in Depth",
            status: "in_progress",
            quizScore: null,
            completionRate: 60,
          },
          {
            id: "4",
            title: "React Router",
            status: "completed",
            quizScore: 95,
            completionRate: 100,
          },
          {
            id: "5",
            title: "Redux Fundamentals",
            status: "in_progress",
            quizScore: null,
            completionRate: 30,
          },
          {
            id: "6",
            title: "Testing React Apps",
            status: "completed",
            quizScore: 88,
            completionRate: 100,
          },
          {
            id: "7",
            title: "React Performance",
            status: "completed",
            quizScore: 92,
            completionRate: 100,
          },
        ],
      });
      setLoading(false);
    };

    void fetchReport();
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const navigateToLesson = (lessonId: string) => {
    console.log(`Navigating to lesson: ${lessonId}`);
    // Implement navigation logic here
  };

  if (loading) {
    return (
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Your Learning Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Your Learning Report</CardTitle>
      </CardHeader>
      <CardContent>
        {report && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Clock className="mb-2 h-8 w-8 text-primary" />
                  <p className="text-2xl font-bold">
                    {formatTime(report.totalTimeSpent)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Time Spent
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CheckCircle className="mb-2 h-8 w-8 text-green-500" />
                  <p className="text-2xl font-bold">
                    {report.lessonsCompleted}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lessons Completed
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Book className="mb-2 h-8 w-8 text-yellow-500" />
                  <p className="text-2xl font-bold">
                    {report.lessonsInProgress}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lessons In Progress
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Lesson Progress</h3>
              {report.lessons.map((lesson) => (
                <Card key={lesson.id}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-medium">{lesson.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigateToLesson(lesson.id)}
                      >
                        {lesson.status === "completed" ? "Revise" : "Continue"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <Progress value={lesson.completionRate} className="mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Completion: {lesson.completionRate}%</span>
                      {lesson.quizScore !== null && (
                        <span>Quiz Score: {lesson.quizScore}%</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
