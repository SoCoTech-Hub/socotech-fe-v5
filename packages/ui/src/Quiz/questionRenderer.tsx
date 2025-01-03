import type { Question } from "./quiz";
import EssayQuestion from "./essay";
import FillInTheBlankQuestion from "./fillInBlank";
import FreeChoiceQuestion from "./freeChoice";
import QuizMatrixSortQuestion from "./matrixSortQuestion";
import MultipleChoiceQuestion from "./multipleChoice";
import SingleChoiceQuestion from "./singleChoice";
import Sortable from "./sortable";

interface QuestionRendererProps {
  question: Question;
  onAnswer: (answer: any) => void;
  answer: any;
}

export default function QuestionRenderer({
  question,
  onAnswer,
  answer,
}: QuestionRendererProps) {
  switch (question.type) {
    case "essay":
      return (
        <EssayQuestion
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "fillInTheBlank":
      return (
        <FillInTheBlankQuestion
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "freeChoice":
      return (
        <FreeChoiceQuestion
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "matrixSort":
      return (
        <QuizMatrixSortQuestion
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "multipleChoice":
      return (
        <MultipleChoiceQuestion
          question={question}
          onAnswer={onAnswer}
          answer={answer}
        />
      );
    case "singleChoice":
      return (
        <SingleChoiceQuestion
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
