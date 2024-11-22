import React from "react";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";

export interface StatusContentProps {
  acceptedFileTypes?: string[];
  errorMessage: string;
  uploadStatus: "idle" | "uploading" | "success" | "error";
  maxSize?: number;
  uploadProgress?: number;
}
const StatusContent = ({
  acceptedFileTypes = ["idle"],
  errorMessage,
  maxSize = 5242880,
  uploadProgress = 0,
  uploadStatus,
}: StatusContentProps) => {
  switch (uploadStatus) {
    case "idle":
      return (
        <>
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="mb-1 text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-muted-foreground/75">
            {acceptedFileTypes.join(", ")} (max. {Math.round(maxSize / 1048576)}{" "}
            MB)
          </p>
        </>
      );
    case "uploading":
      return (
        <div className="flex flex-col items-center">
          <div className="relative mb-2 h-12 w-12">
            <svg className="h-12 w-12 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <circle
                className="opacity-75"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="60"
                strokeDashoffset={60 - (uploadProgress / 100) * 60}
                transform="rotate(-90 12 12)"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
              {uploadProgress}%
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Uploading...</p>
        </div>
      );
    case "success":
      return (
        <div className="flex flex-col items-center">
          <CheckCircle className="mb-2 h-12 w-12 text-green-500" />
          <p className="text-sm text-muted-foreground">Upload successful!</p>
        </div>
      );
    case "error":
      return (
        <div className="flex flex-col items-center">
          <AlertCircle className="mb-2 h-12 w-12 text-destructive" />
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
        </div>
      );
    default:
      return null;
  }
};
export default StatusContent;
