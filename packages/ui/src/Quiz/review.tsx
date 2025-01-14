import type { SetStateAction } from "react";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import type {
  MultipleChoiceQuestion,
  Question,
  SingleChoiceQuestion,
  SortingChoiceQuestion,
} from "./quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion/accordion";
import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { EssayQuestionComponent } from "./essay";
import { FillInTheBlankQuestionComponent } from "./fillInBlank";
import { FreeChoiceQuestionComponent } from "./freeChoice";
import { QuizMatrixSortQuestionComponent } from "./matrixSortQuestion";
import { MultipleChoiceQuestionComponent } from "./multipleChoice";
import { SingleChoiceQuestionComponent } from "./singleChoice";
import { Sortable } from "./sortable";

interface ReviewQuizProps {
  questions: Question[];
  userAnswers: Record<string, any>;
  onFinishReview: () => void;
}

// Type guards for narrowing question types
const hasCorrectAnswer = (
  question: Question,
): question is
  | MultipleChoiceQuestion
  | SingleChoiceQuestion
  | SortingChoiceQuestion => {
  return "correctAnswer" in question;
};

const isMultipleChoiceQuestion = (
  question: Question,
): question is MultipleChoiceQuestion => question.type === "multipleChoice";

const isSingleChoiceQuestion = (
  question: Question,
): question is SingleChoiceQuestion => question.type === "singleChoice";

const isSortingChoiceQuestion = (
  question: Question,
): question is SortingChoiceQuestion => question.type === "sortingChoice";

export function ReviewQuiz({
  questions,
  userAnswers,
  onFinishReview,
}: ReviewQuizProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const isCorrect = (question: Question, userAnswer: any): boolean | null => {
    if (hasCorrectAnswer(question)) {
      if (question.correctAnswer && Array.isArray(question?.correctAnswer)) {
        return (
          JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)
        );
      }
      return userAnswer === question.correctAnswer;
    }
    return null; // Manual grading or unsupported
  };

  const renderQuestion = (question: Question) => {
    const props = {
      answer: userAnswers[question.id],
      onAnswer: () => {}, // Disable interactions in review mode
    };

    if (isMultipleChoiceQuestion(question)) {
      return <MultipleChoiceQuestionComponent question={question} {...props} />;
    }

    if (isSingleChoiceQuestion(question)) {
      return <SingleChoiceQuestionComponent question={question} {...props} />;
    }

    if (isSortingChoiceQuestion(question)) {
      return (
        <Sortable
          items={question.items}
          correctOrder={question.correctOrder}
          {...props}
          onReorder={() => {}}
        />
      );
    }

    if (question.type === "matrixSort") {
      return <QuizMatrixSortQuestionComponent question={question} {...props} />;
    }

    if (question.type === "fillInTheBlank") {
      return <FillInTheBlankQuestionComponent question={question} {...props} />;
    }

    if (question.type === "essay") {
      return <EssayQuestionComponent question={question} {...props} />;
    }

    if (question.type === "freeChoice") {
      return <FreeChoiceQuestionComponent question={question} {...props} />;
    }

    return <p>Unsupported question type.</p>;
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
              <AccordionItem
                key={question.id}
                value={question.id}
                aria-expanded={expandedQuestion === question.id}
              >
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
                      {hasCorrectAnswer(question) && question.correctAnswer && (
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
                          className={`mt-2 ${
                            correct ? "text-green-600" : "text-red-600"
                          }`}
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
