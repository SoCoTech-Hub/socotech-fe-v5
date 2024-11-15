import React, { useState } from "react";

import type { SubjectCategoryProps } from "./categories";
import type { Lesson } from "./lessons";
import type { Subject } from "./subjects";

interface SubjectHierarchyProps {
  categories: SubjectCategoryProps[];
  onLessonSelect: (
    lesson: Lesson,
    subject: Subject,
    category: SubjectCategoryProps,
  ) => void;
}

export default function SubjectHierarchy({
  categories,
  onLessonSelect,
}: SubjectHierarchyProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<SubjectCategory | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleCategorySelect = (category: SubjectCategory) => {
    setSelectedCategory(category);
    setSelectedSubject(null);
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
      setSelectedSubject(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {renderCategories()}
      {selectedCategory && !selectedSubject && renderSubjects()}
      {selectedSubject && renderLessons()}
    </div>
  );
}
