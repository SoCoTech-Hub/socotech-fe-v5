import React from "react";
import { Paperclip } from "lucide-react";

export interface Attachment {
  url: string;
  id: string;
}

export interface AttachmentsProps {
  attachments?: Attachment[];
}

const Attachments = ({ attachments }: AttachmentsProps) => (
  <div className="mt-4 border-t-2 border-dotted border-black">
    {attachments?.length === 1 ? (
      <div className="text-textColor text-xs font-bold">
        {attachments.length} Attachment
      </div>
    ) : (
      <div className="text-textColor text-xs font-bold">
        {attachments?.length} Attachments
      </div>
    )}
    <div className="mt-2 flex gap-4">
      {attachments?.map((file: Attachment) => (
        <a href={file.url} target="_blank" rel="noreferrer" key={file.id}>
          <Paperclip />
        </a>
      ))}
    </div>
  </div>
);

export default Attachments;
