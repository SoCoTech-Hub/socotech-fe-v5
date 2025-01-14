import type { Question } from "./quiz";
import { Input } from "../input";
import { Label } from "../label";

interface FillInTheBlankQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  answer: string;
}

export function FillInTheBlankQuestionComponent({
  question,
  onAnswer,
  answer,
}: FillInTheBlankQuestionProps) {
  return (
    <div>
      <Label htmlFor={question.id} className="mb-2 text-lg font-medium">
        {question.question}
      </Label>
      <Input
        id={question.id}
        value={answer || ""}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="Fill in the blank"
        className="mt-2"
      />
    </div>
  );
}
