"use client";

import React, { useCallback, useState } from "react";
import { Check, File, Image, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { Button } from "./button";
import { Progress } from "./progress";
import { ScrollArea } from "./scroll-area";

interface FileWithPreview extends File {
  preview: string;
  progress: number;
  status: "idle" | "uploading" | "done" | "error";
}

export default function FileUploader() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
          progress: 0,
          status: "idle" as const,
        }),
      ),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
  });

  const removeFile = (file: FileWithPreview) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const uploadFile = (file: FileWithPreview) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f === file ? { ...f, status: "uploading" as const, progress: 0 } : f,
      ),
    );

    const interval = setInterval(() => {
      setFiles((prevFiles) =>
        prevFiles.map((f) => {
          if (f === file) {
            const progress = Math.min(f.progress + 10, 100);
            return {
              ...f,
              progress,
              status:
                progress === 100 ? ("done" as const) : ("uploading" as const),
            };
          }
          return f;
        }),
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f === file ? { ...f, status: "done" as const, progress: 100 } : f,
        ),
      );
    }, 5000);
  };

  return (
    <div className="w-full max-w-md p-4 mx-auto space-y-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ease-in-out ${
          isDragActive
            ? "border-primary bg-primary/10 dark:bg-primary/20"
            : "border-gray-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop files here, or click to select"}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
          Support for images, PDFs, and Word documents
        </p>
      </div>

      {files.length > 0 && (
        <ScrollArea className="h-[300px] w-full rounded-xl border dark:border-gray-700">
          <div className="p-4 space-y-4">
            {files.map((file) => (
              <div key={file.name} className="flex items-center space-x-4">
                <div className="relative w-10 h-10 overflow-hidden rounded shrink-0">
                  {file.type.startsWith("image/") ? (
                    file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Image className="w-full h-full text-gray-400 dark:text-gray-600" />
                    )
                  ) : (
                    <File className="w-full h-full text-gray-400 dark:text-gray-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Progress value={file.progress} className="h-1 mt-1" />
                </div>
                {file.status === "idle" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => uploadFile(file)}
                    className="shrink-0"
                  >
                    Upload
                  </Button>
                )}
                {file.status === "uploading" && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="shrink-0"
                  >
                    Uploading...
                  </Button>
                )}
                {file.status === "done" && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
                {file.status !== "uploading" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
