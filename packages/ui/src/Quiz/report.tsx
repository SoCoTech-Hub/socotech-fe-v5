/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { Frown, Star, ThumbsUp, Trophy } from "lucide-react";

import type { Question } from "./quiz";
import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
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
    return correctAnswers > 0 ? (correctAnswers / questions.length) * 100 : 0;
  };

  const score = calculateScore();

  const getScoreIcon = () => {
    if (score >= 90) return <Trophy className="text-yellow-500" />;
    if (score >= 75) return <Star className="text-blue-500" />;
    if (score >= 50) return <ThumbsUp className="text-green-500" />;
    return <Frown className="text-red-500" />;
  };

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
        <div className="mb-4 flex items-center space-x-4">
          <p className="text-2xl font-bold">Your Score: {score.toFixed(2)}%</p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            {getScoreIcon()}
          </motion.div>
        </div>
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
