"use client";

import { useState } from "react";

import type { Lesson, Subject } from "./card";
import type { Grade } from "./tabs";
import { LessonCard } from "./card";
import { Grid } from "./grid";
import { ScrollTabs } from "./tabs";

export function Lessons({ grades }: { grades: Grade[] }) {
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
