"use client";

import * as React from "react";
import { useState } from "react";

import type { Lesson, Subject } from "./card";
import type { Grade } from "./tabs";
import LessonCard from "./card";
import Grid from "./grid";
import ScrollTabs from "./tabs";

//TODO: fetch Data
const grades: Grade[] = [
  {
    id: "grade-1",
    name: "Grade 1",
    subjects: [
      {
        id: 1,
        name: "Mathematics",
        imageUrl: "/placeholder.svg?height=200&width=300&text=Mathematics",
        lessons: [
          {
            id: 1,
            title: "Numbers 1-10",
            imageUrl: "/placeholder.svg?height=200&width=300&text=Numbers+1-10",
          },
          {
            id: 2,
            title: "Basic Addition",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Basic+Addition",
          },
          {
            id: 3,
            title: "Basic Subtraction",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Basic+Subtraction",
          },
        ],
      },
      {
        id: 2,
        name: "English",
        imageUrl: "/placeholder.svg?height=200&width=300&text=English",
        lessons: [
          {
            id: 1,
            title: "Alphabet",
            imageUrl: "/placeholder.svg?height=200&width=300&text=Alphabet",
          },
          {
            id: 2,
            title: "Simple Words",
            imageUrl: "/placeholder.svg?height=200&width=300&text=Simple+Words",
          },
          {
            id: 3,
            title: "Basic Sentences",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Basic+Sentences",
          },
        ],
      },
    ],
  },
  {
    id: "grade-2",
    name: "Grade 2",
    subjects: [
      {
        id: 3,
        name: "Mathematics",
        imageUrl: "/placeholder.svg?height=200&width=300&text=Mathematics",
        lessons: [
          {
            id: 1,
            title: "Multiplication Tables",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Multiplication+Tables",
          },
          {
            id: 2,
            title: "Basic Division",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Basic+Division",
          },
          {
            id: 3,
            title: "Fractions Introduction",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Fractions+Introduction",
          },
        ],
      },
      {
        id: 4,
        name: "English",
        imageUrl: "/placeholder.svg?height=200&width=300&text=English",
        lessons: [
          {
            id: 1,
            title: "Reading Comprehension",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Reading+Comprehension",
          },
          {
            id: 2,
            title: "Parts of Speech",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Parts+of+Speech",
          },
          {
            id: 3,
            title: "Writing Paragraphs",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Writing+Paragraphs",
          },
        ],
      },
    ],
  },
];

export default function Lessons() {
  const [selectedGrade, setSelectedGrade] = useState(
    grades.length > 0 ? grades[0]?.id : "",
  );
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectSubject = (subject: Subject) => {
    setIsLoading(true);
    setSelectedSubject(subject);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  const currentGrade = grades.find((grade) => grade.id === selectedGrade);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Lessons</h1>
      <ScrollTabs
        grades={grades}
        selectedGrade={selectedGrade ?? ""}
        setSelectedGrade={setSelectedGrade}
      />
      {currentGrade && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            {currentGrade.name}{" "}
            {selectedSubject ? `- ${selectedSubject.name}` : "Subjects"}
          </h2>
          {selectedSubject ? (
            <>
              <button
                onClick={handleBackToSubjects}
                className="mb-4 text-blue-500 hover:underline"
              >
                ← Back to Subjects
              </button>
              <Grid
                items={selectedSubject.lessons}
                renderItem={(lesson: Lesson) => (
                  <LessonCard key={lesson.id} item={lesson} type="lesson" />
                )}
                isLoading={isLoading}
              />
            </>
          ) : (
            <Grid
              items={currentGrade.subjects}
              renderItem={(subject: Subject) => (
                <div
                  key={subject.id}
                  onClick={() => handleSelectSubject(subject)}
                  className="cursor-pointer"
                >
                  <LessonCard item={subject} type="subject" />
                </div>
              )}
            />
          )}
        </div>
      )}
    </div>
  );
}
