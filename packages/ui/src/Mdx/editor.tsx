"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@acme/ui";

// Dynamically import the Quill CSS
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface MDXEditorProps {
  initialValue?: string;
}

export function MDXEditor({ initialValue = "" }: MDXEditorProps) {
  const [content, setContent] = useState(initialValue);
  const [preview, setPreview] = useState("");

  const handleChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handlePreview = useCallback(() => {
    // Simple MDX to HTML conversion (this is a basic example and doesn't handle all MDX features)
    const htmlContent = content
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\n/gim, "<br>");

    // Sanitize the HTML
    const sanitizedHtml = DOMPurify.sanitize(htmlContent);
    setPreview(sanitizedHtml);
  }, [content]);
  console.log(content);
  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <Tabs defaultValue="edit">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            className="mb-12 h-[400px]"
          />
          <Button onClick={handlePreview} className="mt-4">
            Update Preview
          </Button>
        </TabsContent>
        <TabsContent value="preview">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
