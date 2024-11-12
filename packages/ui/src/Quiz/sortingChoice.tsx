/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";

import type { Question } from "./quiz";
import { Button } from "../../button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../card";
import ReviewQuiz from "./review";

interface QuizReportProps {
  answers: Record<string, any>;
  questions: Question[];
  onRetry: () => void;
  onContinue: () => void;
}

export default function QuizReport({
  answers,
  questions,
  onRetry,
  onContinue,
}: QuizReportProps) {
  const [showReview, setShowReview] = useState(false);

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (question.type === "essay" || question.type === "freeChoice") {
        // These types need manual grading
        return;
      }

      const userAnswer = answers[question.id];
      const correctAnswer = question.correctAnswer;

      if (Array.isArray(correctAnswer)) {
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === correctAnswer.length
        ) {
          const isCorrect = userAnswer.every(
            (item, index) => item === correctAnswer[index],
          );
          if (isCorrect) correctAnswers++;
        }
      } else if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / questions.length) * 100;
  };

  const score = calculateScore();

  if (showReview) {
    return (
      <ReviewQuiz
        questions={questions}
        userAnswers={answers}
        onFinishReview={() => setShowReview(false)}
      />
    );
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Quiz Report</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-2xl font-bold">
          Your Score: {score.toFixed(2)}%
        </p>
        <p className="mb-4">
          You've completed the quiz. Would you like to review your answers or
          continue?
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => setShowReview(true)}>Review Answers</Button>
        <Button onClick={onRetry}>Retry Quiz</Button>
        <Button onClick={onContinue}>Continue Lesson</Button>
      </CardFooter>
    </Card>
  );
}
