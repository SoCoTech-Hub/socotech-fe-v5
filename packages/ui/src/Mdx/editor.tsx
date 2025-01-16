"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import DOMPurify from "dompurify";

import { Button } from "..";
// Dynamically import the Quill CSS
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface MDXEditorProps {
  initialValue?: string;
  onSave?: (e: string) => void;
}

export function MDXEditor({ initialValue = "", onSave }: MDXEditorProps) {
  const [content, setContent] = useState(initialValue);

  const handleChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handlePreview = useCallback(() => {
    const htmlContent = content
      // Headings
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Inline Code
      .replace(/`(.*?)`/gim, "<code>$1</code>")
      // Links
      .replace(
        /\[(.*?)\]\((.*?)\)/gim,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      // Images
      .replace(
        /!\[(.*?)\]\((.*?)\)/gim,
        '<img src="$2" alt="$1" class="my-4 max-w-full" />',
      )
      // Blockquotes
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      // Ordered Lists
      .replace(/^\d+\. (.*$)/gim, "<li>$1</li>")
      // Unordered Lists
      .replace(/^[-*+] (.*$)/gim, "<li>$1</li>")
      // Code Blocks (fenced with triple backticks)
      .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")
      // Line Breaks
      .replace(/\n/gim, "<br>");

    // Wrap list items in their respective containers
    const sanitizedHtml = DOMPurify.sanitize(
      htmlContent
        .replace(/(<li>.*?<\/li>)/gim, "<ul>$1</ul>") // Wrap list items
        .replace(/(<ul>.*?<\/ul>)(?!<\/ul>)/gim, "<ol>$1</ol>"), // Wrap ordered list items
    );
    onSave?.(sanitizedHtml);
  }, [content]);

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        className="mb-4 h-40"
        placeholder="Type your message..."
      />
      <Button onClick={handlePreview}>Save</Button>
    </div>
  );
}
