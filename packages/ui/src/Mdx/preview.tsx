"use client";

import React from "react";

interface MDXPreviewProps {
  value?: string;
}

export function MDXPreview({ value = "" }: MDXPreviewProps) {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 p-4 lg:grid-cols-2">
      <div
        className="prose dark:prose-invert max-w-none rounded-lg border border-gray-300 bg-white p-4 dark:bg-gray-800"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
