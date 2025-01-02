import { useEffect, useRef } from "react";
import Quill from "quill";

import Editor from "./editor";

const Delta = Quill.import("delta");

export interface MDXProps {
  value: string;
  setValue?: (e: string) => void;
}

const MDX = ({ value, setValue }: MDXProps) => {
  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  useEffect(() => {
    if (value !== quillRef.current?.root?.innerHTML && setValue) {
      setValue(quillRef.current?.root?.innerHTML);
    }
  }, [quillRef]);

  return (
    <div>
      <Editor ref={quillRef} defaultValue={new Delta().insert(value)} />
    </div>
  );
};

export default MDX;
