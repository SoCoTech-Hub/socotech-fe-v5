"use client";

import React from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

import { Card, CardContent } from "../card";
import { Skeleton } from "../skeleton";

// Dynamically load ReactQuill with SSR disabled and a skeleton loading component
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

interface MdxEditorProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Quill editor configuration for modules and formats
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

// Main MDX Editor component
export const MdxEditor: React.FC<MdxEditorProps> = ({
  value,
  setValue,
  placeholder = "Compose your message here...",
  disabled = false,
}) => {
  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardContent className="p-0">
        <QuillNoSSRWrapper
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          readOnly={disabled}
          theme="snow"
          className="min-h-[200px] rounded-lg bg-background text-foreground"
        />
      </CardContent>
    </Card>
  );
};

export default MdxEditor;
