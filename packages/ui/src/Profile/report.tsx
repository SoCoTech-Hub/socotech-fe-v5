"use client";

import type { SetStateAction } from "react";
import { useEffect, useState } from "react";
import { ArrowRight, Book, CheckCircle, Clock, Lock } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Progress } from "../progress";
import { Select, SelectItem } from "../select";
import { Skeleton } from "../skeleton";

interface Lesson {
  id: string;
  title: string;
  status: "completed" | "in_progress" | "not_started";
  quizScore: number | null;
  completionRate: number;
  price: number;
}

interface UserReport {
  totalTimeSpent: number;
  lessonsCompleted: number;
  lessonsInProgress: number;
  lessons: Lesson[];
}

interface FilterOptions {
  grades: string[];
  subjectCategories: string[];
  subjects: string[];
}

export default function ReportSection() {
  const [report, setReport] = useState<UserReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  //TODO: fetch filterOptions
  const filterOptions: FilterOptions = {
    grades: ["Grade 1", "Grade 2", "Grade 3"],
    subjectCategories: ["Math", "Science", "History"],
    subjects: ["Algebra", "Biology", "World History"],
  };

  useEffect(() => {
    const fetchReport = async () => {
      //TODO: Fetch report data
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setReport({
        totalTimeSpent: 3600,
        lessonsCompleted: 5,
        lessonsInProgress: 2,
        lessons: [],
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

  const filteredLessons = report?.lessons.filter((lesson) => {
    const gradeMatch = selectedGrade
      ? lesson.title.includes(selectedGrade)
      : true;
    const categoryMatch = selectedCategory
      ? lesson.title.includes(selectedCategory)
      : true;
    const subjectMatch = selectedSubject
      ? lesson.title.includes(selectedSubject)
      : true;
    return gradeMatch && categoryMatch && subjectMatch;
  });

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
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <Select
              placeholder="Select Grade"
              onChange={(e: {
                target: { value: SetStateAction<string | null> };
              }) => setSelectedGrade(e.target.value)}
            >
              {filterOptions.grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Select Category"
              onChange={(e: {
                target: { value: SetStateAction<string | null> };
              }) => setSelectedCategory(e.target.value)}
            >
              {filterOptions.subjectCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Select Subject"
              onChange={(e: {
                target: { value: SetStateAction<string | null> };
              }) => setSelectedSubject(e.target.value)}
            >
              {filterOptions.subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Report Summary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Clock className="mb-2 h-8 w-8 text-primary" />
                <p className="text-2xl font-bold">
                  {formatTime(report?.totalTimeSpent ?? 0)}
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
                  {report?.lessonsCompleted ?? 0}
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
                  {report?.lessonsInProgress ?? 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  Lessons In Progress
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lessons List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lesson Progress</h3>
            {filteredLessons?.map((lesson) => (
              <Card key={lesson.id}>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <h4 className="font-medium">{lesson.title}</h4>
                      {lesson.price && (
                        <Lock className="ml-2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        console.log(`Navigating to lesson: ${lesson.id}`)
                      }
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
      </CardContent>
    </Card>
  );
}
