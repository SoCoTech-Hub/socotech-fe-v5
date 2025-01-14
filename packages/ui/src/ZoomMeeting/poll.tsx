"use client";

import { useState } from "react";

import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "../radio-group";

interface PollOption {
  id: string;
  text: string;
}

export interface PollProps {
  question: string;
  options: PollOption[];
  onSubmit: (selectedOption: string) => void;
}

export function ZoomPoll({ question, options, onSubmit }: PollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedOption) {
      onSubmit(selectedOption);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
          >
            {options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={!selectedOption}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
