import { useEffect, useRef } from "react";
import Quill from "quill";

import Editor from "./editor";

export interface MDXProps {
  value: string;
  setValue?: (e: string) => void;
}

const MDX = ({ value, setValue }: MDXProps) => {
  // Use a ref to access the Quill instance directly
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && setValue) {
      const editorHTML = quillRef.current.root.innerHTML;

      // Update the value if it differs from the current Quill content
      if (value !== editorHTML) {
        setValue(editorHTML);
      }
    }
  }, [value, setValue]);

  return (
    <div>
      <Editor ref={quillRef} defaultValue={value} />
    </div>
  );
};

export default MDX;
