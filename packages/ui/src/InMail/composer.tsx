import { Paperclip, Send, X } from "lucide-react";

import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";

export interface InmailComposerProps {
  setComposing: (composing: boolean) => void;
  handleAttachment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  attachment?: File | null;
}

const InmailComposer: React.FC<InmailComposerProps> = ({
  setComposing,
  handleAttachment,
  attachment,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="w-full max-w-2xl rounded-lg bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Compose Email</h2>
        <Button size="icon" variant="ghost" onClick={() => setComposing(false)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <Input type="text" placeholder="To" className="mb-2" />
      <Input type="text" placeholder="Subject" className="mb-2" />
      <Textarea placeholder="Email body" className="mb-4" rows={10} />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Input
            type="file"
            id="attachment"
            className="hidden"
            onChange={handleAttachment}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("attachment")?.click()}
          >
            <Paperclip className="mr-2 h-4 w-4" />
            Attach File
          </Button>
          {attachment && <span className="ml-2">{attachment.name}</span>}
        </div>
        <Button>
          <Send className="mr-2 h-4 w-4" /> Send
        </Button>
      </div>
    </div>
  </div>
);

export default InmailComposer;
