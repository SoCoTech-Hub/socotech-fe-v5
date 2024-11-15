import { Star, Trash2 } from "lucide-react";

import type { EmailProps } from "./view";
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";

export interface InmailListProps {
  emails: EmailProps[];
  onSelectEmail: (email: EmailProps) => void;
  onStarEmail: (id: number) => void;
  onTrashEmail: (id: number) => void;
}

const InmailList: React.FC<InmailListProps> = ({
  emails,
  onSelectEmail,
  onStarEmail,
  onTrashEmail,
}) => (
  <ScrollArea className="w-full border-r bg-white">
    {emails.map((email) => (
      <div
        key={email.id}
        className="flex cursor-pointer items-center border-b p-4 hover:bg-gray-100"
        onClick={() => onSelectEmail(email)}
      >
        <div className="flex-1">
          <h3 className="font-bold">{email.from}</h3>
          <p className="text-sm text-gray-600">{email.subject}</p>
        </div>
        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onStarEmail(email.id);
            }}
            aria-label={email.starred ? "Unstar email" : "Star email"}
          >
            <Star
              className={`h-4 w-4 ${email.starred ? "fill-current text-yellow-400" : ""}`}
            />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onTrashEmail(email.id);
            }}
            aria-label={email.trash ? "Restore email" : "Move to trash"}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ))}
  </ScrollArea>
);

export default InmailList;
