import React, { forwardRef, useEffect, useRef } from "react";
import Quill from "quill";

interface EditorProps {
  defaultValue?: string;
}

const Editor = forwardRef<Quill | null, EditorProps>(
  ({ defaultValue }, ref) => {
    const containerRef = useRef<HTMLDivElement>();
    const defaultValueRef = useRef(defaultValue);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      if (typeof ref === "function") {
        ref(quill);
      } else if (ref && "current" in ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef?.current);
      }

      return () => {
        if (ref && "current" in ref) {
          ref.current = null;
        }
        container.innerHTML = "";
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = "Editor";

export default Editor;
