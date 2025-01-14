import type { SingleChoiceQuestion as SingleChoiceQuestionType } from "./quiz";
import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "../radio-group";

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType; // Specific type for single-choice questions
  onAnswer: (answer: string) => void;
  answer: string;
}

export function SingleChoiceQuestionComponent({
  question,
  onAnswer,
  answer,
}: SingleChoiceQuestionProps) {
  return (
    <div>
      <Label
        id={`question-${question.id}`}
        className="mb-4 text-lg font-medium"
      >
        {question.question}
      </Label>
      <RadioGroup
        onValueChange={onAnswer}
        value={answer}
        aria-labelledby={`question-${question.id}`}
      >
        {question.options?.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option}
              id={`${question.id}-${option}`}
              aria-labelledby={`${question.id}-${option}-label`}
            />
            <Label
              id={`${question.id}-${option}-label`}
              htmlFor={`${question.id}-${option}`}
            >
              {option}
            </Label>
          </div>
        )) || <p className="text-muted">No options available.</p>}
      </RadioGroup>
    </div>
  );
}
