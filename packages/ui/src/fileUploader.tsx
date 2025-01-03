"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, File, Upload, X } from "lucide-react";
import { FileRejection, useDropzone } from "react-dropzone";

import { Button } from "./button";
import { Progress } from "./progress";
import { ScrollArea } from "./scroll-area";

interface FileWithPreview extends File {
  preview: string | null;
  progress: number;
  status: "idle" | "uploading" | "done" | "error";
  errorMessage?: string;
}

interface FileUploaderProps {
  maxFileSize?: number; // Max file size in MB
  allowedTypes?: string[];
  dragAndDropMessage?: string;
  dropActiveMessage?: string;
  onFileUpload: (file: FileWithPreview) => Promise<void>; // Function to handle the file upload
}

export default function FileUploader({
  maxFileSize = 5, // Default max file size: 5MB
  allowedTypes = ["image/*", "application/pdf", "application/msword"],
  dragAndDropMessage = "Drag 'n' drop files here, or click to select",
  dropActiveMessage = "Drop the files here...",
  onFileUpload,
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const validFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
          progress: 0,
          status: "idle" as const,
        }),
      );

      const invalidFiles = fileRejections.map((rejection) => ({
        ...rejection.file,
        preview: null,
        progress: 0,
        status: "error" as const,
        errorMessage: rejection.errors.map((err) => err.message).join(", "),
      }));

      setFiles((prevFiles) => [...prevFiles, ...validFiles, ...invalidFiles]);
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize * 1024 * 1024, // Convert MB to bytes
  });

  const removeFile = (file: FileWithPreview) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    if (file.preview) URL.revokeObjectURL(file.preview);
  };

  const uploadFile = async (file: FileWithPreview) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f === file ? { ...f, status: "uploading", progress: 0 } : f,
      ),
    );

    try {
      await onFileUpload(file);

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f === file ? { ...f, status: "done", progress: 100 } : f,
        ),
      );
    } catch (error) {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f === file
            ? {
                ...f,
                status: "error",
                errorMessage: "Upload failed. Please try again.",
              }
            : f,
        ),
      );
    }
  };

  useEffect(() => {
    return () => {
      // Revoke object URLs on component unmount
      files.forEach(
        (file) => file.preview && URL.revokeObjectURL(file.preview),
      );
    };
  }, [files]);

  return (
    <div className="mx-auto w-full max-w-md space-y-4 p-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ease-in-out ${
          isDragActive
            ? "border-primary bg-primary/10 dark:bg-primary/20"
            : "border-gray-300 hover:border-primary dark:border-gray-700 dark:hover:border-primary"
        }`}
        aria-label="File upload area"
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {isDragActive ? dropActiveMessage : dragAndDropMessage}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
          Supported types: images, PDFs, and Word documents
        </p>
      </div>

      {files.length > 0 && (
        <ScrollArea className="h-[300px] w-full rounded-xl border dark:border-gray-700">
          <div className="space-y-4 p-4">
            {files.map((file) => (
              <div key={file.name} className="flex items-center space-x-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                  {file.type.startsWith("image/") && file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <File className="h-full w-full text-gray-400 dark:text-gray-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Progress value={file.progress} className="mt-1 h-1" />
                  {file.status === "error" && (
                    <p className="text-xs text-red-500">{file.errorMessage}</p>
                  )}
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
                  <Check className="h-5 w-5 text-green-500" />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
