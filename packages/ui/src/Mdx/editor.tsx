import { forwardRef, useEffect, useRef } from "react";
import Quill, { QuillOptions } from "quill";

interface EditorProps {
  defaultValue?: string;
}

export const Editor = forwardRef<Quill | null, EditorProps>(
  ({ defaultValue }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef<string | undefined>(defaultValue);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );

      const quill = new Quill(editorContainer, {
        theme: "snow",
      } as QuillOptions);

      // Handle ref assignment
      if (typeof ref === "function") {
        ref(quill);
      } else if (ref && "current" in ref) {
        ref.current = quill;
      }

      // Set the initial content if defaultValue is provided
      if (defaultValueRef.current) {
        quill.setText(defaultValueRef.current);
      }

      // Cleanup on unmount
      return () => {
        if (ref && "current" in ref) {
          ref.current = null;
        }
        container.innerHTML = ""; // Clear the container
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = "Editor";
