/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { cn } from "..";
import { useToast } from "../hooks/use-toast";
import StatusContent from "./statusContent";

export interface DropzoneProps {
  maxSize?: number;
  acceptedFileTypes?: string[];
  uploadUrl: string;
}

function Dropzone({
  maxSize = 5242880,
  acceptedFileTypes = ["image/*", "application/pdf"],
  uploadUrl,
}: DropzoneProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setUploadStatus("uploading");
        setUploadProgress(0);
        setErrorMessage("");

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }

          setUploadStatus("success");
          toast({
            title: "File uploaded successfully",
            description: `${file.name} has been uploaded.`,
          });
        } catch (error) {
          const errorMsg =
            error instanceof Error ? error.message : "Upload failed";
          setUploadStatus("error");
          setErrorMessage(errorMsg);
          toast({
            title: "Upload failed",
            description: errorMsg,
            variant: "destructive",
          });
        }
      }
    },
    [uploadUrl, toast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedFileTypes.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {},
    ),
  });

  useEffect(() => {
    if (uploadStatus === "uploading") {
      const timer = setInterval(() => {
        setUploadProgress((oldProgress) => {
          const newProgress = oldProgress + 10;
          if (newProgress >= 100) {
            clearInterval(timer);
          }
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 500);
      clearInterval(timer);
    } else {
      setUploadProgress(0);
    }
  }, [uploadStatus]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/25 hover:border-primary/50",
        uploadStatus === "uploading" && "pointer-events-none",
      )}
      role="button"
      aria-live="polite"
    >
      <input {...getInputProps()} />
      <StatusContent
        errorMessage={errorMessage}
        acceptedFileTypes={acceptedFileTypes}
        maxSize={maxSize}
        uploadProgress={uploadProgress}
        uploadStatus={uploadStatus}
      />
    </div>
  );
}
export default Dropzone;
