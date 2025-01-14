import { ArrowLeft, Share2 } from "lucide-react";

import { Button } from "../button";

export interface HeaderSectionProps {
  subject: string;
  title: string;
}
//TODO: add the functions
export const HeaderSection: React.FC<HeaderSectionProps> = ({
  subject,
  title,
}) => {
  const handleBackClick = () => {
    console.log("Back button clicked");
    // Add navigation logic here, e.g., window.history.back();
  };

  const handleTakeNotesClick = () => {
    console.log("Take Notes button clicked");
    // Add logic for taking notes here
  };

  const handleShareClick = () => {
    console.log("Share button clicked");
    // Add logic for sharing here
  };

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" onClick={handleBackClick}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button onClick={handleTakeNotesClick}>Take Notes</Button>
          <Button variant="outline" onClick={handleShareClick}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold">{subject}</h1>
      <h2 className="text-xl">{title}</h2>
    </div>
  );
};
