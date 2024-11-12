import type { Question } from "./quiz";
import { Checkbox } from "../../checkbox";
import { Label } from "../../label";

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswer: (answer: string[]) => void;
  answer: string[];
}

export default function MultipleChoiceQuestion({
  question,
  onAnswer,
  answer,
}: MultipleChoiceQuestionProps) {
  const handleChange = (option: string) => {
    const newAnswer = [...answer];
    if (newAnswer.includes(option)) {
      newAnswer.splice(newAnswer.indexOf(option), 1);
    } else {
      newAnswer.push(option);
    }
    onAnswer(newAnswer);
  };

  return (
    <div>
      <Label className="mb-4 text-lg font-medium">{question.question}</Label>
      <div className="space-y-2">
        {question.options?.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${question.id}-${option}`}
              checked={answer.includes(option)}
              onCheckedChange={() => handleChange(option)}
            />
            <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
