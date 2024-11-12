"use client";

import { useState } from "react";

import { Button } from "../../button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../card";
import EssayQuestion from "./essay";
import FillInTheBlankQuestion from "./fillInBlank";
import FreeChoiceQuestion from "./freeChoice";
import MatrixSortQuestion from "./matrixSort";
import MultipleChoiceQuestion from "./multipleChoice";
import QuizReport from "./report";
import SingleChoiceQuestion from "./singleChoice";
import SortingChoiceQuestion from "./sortingChoice";

export type QuestionType =
  | "essay"
  | "fillInTheBlank"
  | "freeChoice"
  | "matrixSort"
  | "multipleChoice"
  | "singleChoice"
  | "sortingChoice";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  matrixData?: { [key: string]: string[] };
}

interface QuizProps {
  questions: Question[];
  onComplete: (results: { [key: string]: any }) => void;
  onRetry: () => void;
  onContinue: () => void;
}

export default function Quiz({
  questions,
  onComplete,
  onRetry,
  onContinue,
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [showReport, setShowReport] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowReport(true);
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "essay":
        return (
          <EssayQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "fillInTheBlank":
        return (
          <FillInTheBlankQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "freeChoice":
        return (
          <FreeChoiceQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "matrixSort":
        return (
          <MatrixSortQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "multipleChoice":
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "singleChoice":
        return (
          <SingleChoiceQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      case "sortingChoice":
        return (
          <SortingChoiceQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            answer={answers[currentQuestion.id]}
          />
        );
      default:
        return null;
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
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
