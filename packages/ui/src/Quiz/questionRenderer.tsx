import type { Question } from "./quiz";
import { EssayQuestionComponent } from "./essay";
import { FillInTheBlankQuestionComponent } from "./fillInBlank";
import { FreeChoiceQuestionComponent } from "./freeChoice";
import { QuizMatrixSortQuestionComponent } from "./matrixSortQuestion";
import { MultipleChoiceQuestionComponent } from "./multipleChoice";
import { SingleChoiceQuestionComponent } from "./singleChoice";
import { Sortable } from "./sortable";

export interface QuestionRendererProps {
  question: Question;
  onAnswer: (answer: any) => void;
  answer: any;
}

export function QuestionRenderer({
  question,
  onAnswer,
  answer,
}: QuestionRendererProps) {
  switch (question.type) {
    case "essay":
      return (
        <EssayQuestionComponent
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "fillInTheBlank":
      return (
        <FillInTheBlankQuestionComponent
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "freeChoice":
      return (
        <FreeChoiceQuestionComponent
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "matrixSort":
      return (
        <QuizMatrixSortQuestionComponent
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "multipleChoice":
      return (
        <MultipleChoiceQuestionComponent
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "singleChoice":
      return (
        <SingleChoiceQuestionComponent
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "sortingChoice":
      return (
        <Sortable
          items={question.items}
          correctOrder={question.correctOrder}
          onReorder={onAnswer}
        />
      );
    default:
      return <div>Question type unsupported</div>;
  }
}
