import { Star, Trash2, X } from "lucide-react";

import { Button } from "../button";

export interface EmailProps {
  id: number;
  from: string;
  subject: string;
  body: string;
  starred: boolean;
  important: boolean;
  trash: boolean;
}

export interface InmailViewProps {
  email: EmailProps;
  onStar: (id: number) => void;
  onTrash: (id: number) => void;
  onClose: (id: number) => void;
}

export const InmailView = ({
  email,
  onStar,
  onTrash,
  onClose,
}: InmailViewProps) => (
  <div className="h-full overflow-auto bg-white p-4">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold">{email.subject}</h2>
      <div className="flex items-center">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onStar(email.id)}
          aria-label={email.starred ? "Unstar email" : "Star email"}
        >
          <Star
            className={`h-4 w-4 ${email.starred ? "fill-yellow-400" : ""}`}
          />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onTrash(email.id)}
          aria-label={email.trash ? "Restore email" : "Move to trash"}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onClose(email.id)}
          className="md:hidden"
          aria-label="Close email"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <p className="mb-4 text-gray-600">From: {email.from}</p>
    <p>{email.body}</p>
  </div>
);
