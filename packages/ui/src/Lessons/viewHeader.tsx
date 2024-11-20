import React from "react";
import { Button } from "../button";
import { ArrowLeft, Share2 } from "lucide-react";

interface HeaderSectionProps {
  subject: string;
  title: string;
  onBackClick: () => void;
  onTakeNotesClick: () => void;
  onShareClick: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  subject,
  title,
  onBackClick,
  onTakeNotesClick,
  onShareClick,
}) => {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" onClick={onBackClick}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button onClick={onTakeNotesClick}>Take Notes</Button>
          <Button variant="outline" onClick={onShareClick}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold">{subject}</h1>
      <h2 className="text-xl">{title}</h2>
    </div>
  );
};

export default HeaderSection;
