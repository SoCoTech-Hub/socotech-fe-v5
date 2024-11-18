import React, { useState } from "react";

import type { SubjectCategory } from "./categories";
import type { Lesson } from "./lessons";
import type { Subject } from "./subjects";
import SubjectCategories from "./categories";
import Lessons from "./lessons";
import Subjects from "./subjects";

interface SubjectHierarchyProps {
  categories: SubjectCategory[];
  onLessonSelect: (
    lesson: Lesson,
    subject: Subject,
    category: SubjectCategory,
  ) => void;
}

export default function SubjectHierarchy({
  categories,
  onLessonSelect,
}: SubjectHierarchyProps) {
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory>();
  const [selectedSubject, setSelectedSubject] = useState<Subject>();

  const handleCategorySelect = (category: SubjectCategory) => {
    setSelectedCategory(category);
    setSelectedSubject(undefined);
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    if (selectedCategory && selectedSubject) {
      onLessonSelect(lesson, selectedSubject, selectedCategory);
    }
  };

  const handleBack = () => {
    if (selectedSubject) {
      setSelectedSubject(undefined);
    } else if (selectedCategory) {
      setSelectedCategory(undefined);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <SubjectCategories
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
      />
      {selectedCategory && !selectedSubject && (
        <Subjects
          selectedCategory={selectedCategory}
          handleBack={handleBack}
          handleSubjectSelect={handleSubjectSelect}
        />
      )}
      {selectedSubject && (
        <Lessons
          selectedSubject={selectedSubject}
          handleBack={handleBack}
          handleLessonSelect={handleLessonSelect}
        />
      )}
    </div>
  );
}
