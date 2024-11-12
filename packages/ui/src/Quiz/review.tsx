/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SetStateAction } from "react";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import type { Question } from "./quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../accordion";
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
import SingleChoiceQuestion from "./singleChoice";
import SortingChoiceQuestion from "./sortingChoice";

interface ReviewQuizProps {
  questions: Question[];
  userAnswers: Record<string, any>;
  onFinishReview: () => void;
}

export default function ReviewQuiz({
  questions,
  userAnswers,
  onFinishReview,
}: ReviewQuizProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const isCorrect = (question: Question, userAnswer: any) => {
    if (question.type === "essay" || question.type === "freeChoice") {
      return null; // These need manual grading
    }

    if (Array.isArray(question.correctAnswer)) {
      return (
        JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)
      );
    }

    return userAnswer === question.correctAnswer;
  };

  const renderQuestion = (question: Question) => {
    const props = {
      question,
      answer: userAnswers[question.id],
      onAnswer: () => {}, // Disable answer changes in review mode
    };

    switch (question.type) {
      case "essay":
        return <EssayQuestion {...props} />;
      case "fillInTheBlank":
        return <FillInTheBlankQuestion {...props} />;
      case "freeChoice":
        return <FreeChoiceQuestion {...props} />;
      case "matrixSort":
        return <MatrixSortQuestion {...props} />;
      case "multipleChoice":
        return <MultipleChoiceQuestion {...props} />;
      case "singleChoice":
        return <SingleChoiceQuestion {...props} />;
      case "sortingChoice":
        return <SortingChoiceQuestion {...props} />;
      default:
        return null;
    }
  };

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Quiz Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion
          type="single"
          collapsible
          value={expandedQuestion ?? undefined}
          onValueChange={(value: SetStateAction<string | null>) =>
            setExpandedQuestion(value)
          }
        >
          {questions.map((question, index) => {
            const correct = isCorrect(question, userAnswers[question.id]);
            return (
              <AccordionItem key={question.id} value={question.id}>
                <AccordionTrigger className="flex items-center">
                  <span className="flex items-center">
                    {correct === true && (
                      <CheckCircle2 className="mr-2 text-green-500" />
                    )}
                    {correct === false && (
                      <XCircle className="mr-2 text-red-500" />
                    )}
                    Question {index + 1}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {renderQuestion(question)}
                    <div className="mt-4">
                      <p className="font-semibold">Your Answer:</p>
                      <p>{JSON.stringify(userAnswers[question.id])}</p>
                      {question.correctAnswer && (
                        <>
                          <p className="mt-2 font-semibold">Correct Answer:</p>
                          <p>{JSON.stringify(question.correctAnswer)}</p>
                        </>
                      )}
                      {question.type === "essay" ||
                      question.type === "freeChoice" ? (
                        <p className="mt-2 text-yellow-600">
                          This question requires manual grading.
                        </p>
                      ) : (
                        <p
                          className={`mt-2 ${correct ? "text-green-600" : "text-red-600"}`}
                        >
                          {correct ? "Correct!" : "Incorrect"}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button onClick={onFinishReview}>Finish Review</Button>
      </CardFooter>
    </Card>
  );
}
