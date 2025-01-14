"use client";

import { useState } from "react";

import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { EssayQuestionComponent } from "./essay";
import { FillInTheBlankQuestionComponent } from "./fillInBlank";
import { FreeChoiceQuestionComponent } from "./freeChoice";
import { QuizMatrixSortQuestionComponent } from "./matrixSortQuestion";
import { MultipleChoiceQuestionComponent } from "./multipleChoice";
import { QuizReport } from "./report";
import { SingleChoiceQuestionComponent } from "./singleChoice";
import { Sortable } from "./sortable";

export type QuestionType =
  | "essay"
  | "fillInTheBlank"
  | "freeChoice"
  | "matrixSort"
  | "multipleChoice"
  | "singleChoice"
  | "sortingChoice";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
}

export interface EssayQuestion extends BaseQuestion {
  type: "essay";
  correctAnswer: string;
}

export interface MatrixSortQuestion extends BaseQuestion {
  type: "matrixSort";
  matrixData: { [key: string]: string[] };
}

export interface FillInTheBlankQuestion extends BaseQuestion {
  type: "fillInTheBlank";
}

export interface FreeChoiceQuestion extends BaseQuestion {
  type: "freeChoice";
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multipleChoice";
  options: string[];
  correctAnswer: string[]; // Add correctAnswer property
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "singleChoice";
  options: string[];
  correctAnswer: string; // Add correctAnswer property
}

export interface SortingChoiceQuestion {
  id: string;
  type: "sortingChoice";
  question: string;
  items: { id: string; content: string }[];
  correctOrder: string[];
  correctAnswer: string[]; // Add correctAnswer property
}

export type Question =
  | EssayQuestion
  | FillInTheBlankQuestion
  | FreeChoiceQuestion
  | MatrixSortQuestion
  | MultipleChoiceQuestion
  | SingleChoiceQuestion
  | SortingChoiceQuestion;

interface QuizProps {
  questions: Question[];
  onComplete: (results: { [key: string]: any }) => void;
  onRetry: () => void;
  onContinue: () => void;
}

export function Quiz({
  questions,
  onComplete,
  onRetry,
  onContinue,
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [showReport, setShowReport] = useState(false);

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: any) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowReport(true);
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "essay":
        return (
          <EssayQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "fillInTheBlank":
        return (
          <FillInTheBlankQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "freeChoice":
        return (
          <FreeChoiceQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "matrixSort":
        return (
          <QuizMatrixSortQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "multipleChoice":
        return (
          <MultipleChoiceQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "singleChoice":
        return (
          <SingleChoiceQuestionComponent
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "sortingChoice":
        return (
          <Sortable
            items={currentQuestion.items}
            correctOrder={currentQuestion.correctOrder}
            onReorder={handleAnswer}
          />
        );
      default:
        return <div>Unsupported question type.</div>;
    }
  };

  if (showReport) {
    return (
      <QuizReport
        answers={answers}
        questions={questions}
        onRetry={onRetry}
        onContinue={onContinue}
      />
    );
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>{renderQuestion()}</CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          aria-label="Go to the previous question"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          aria-label={
            currentQuestionIndex === questions.length - 1
              ? "Finish the quiz"
              : "Go to the next question"
          }
        >
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
