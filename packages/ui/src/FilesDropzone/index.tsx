// import React, { useMemo } from "react"
// import { useDropzone } from "react-dropzone"
// import {
//   baseStyle,
//   thumbsContainer,
//   removeImageButton,
//   activeStyle,
//   acceptStyle,
//   rejectStyle,
// } from "./styles"
// import removeAttachment from "@/snippets/removeAttachment"
// import { baseUrl } from "@/context/constants"

// interface FilePreview {
//   id: string
//   preview: string
//   name: string
//   mime?: string
// }

// interface FilesDropzoneProps {
//   loading?: boolean
//   onDrop: (acceptedFiles: File[]) => void
//   files: File[]
//   filesPreviews?: FilePreview[]
//   filesSetter?: (files: File[]) => void
//   dropzonePlaceholder?: string
//   acceptFileTypes?: string
// }

// const FilesDropzone: React.FC<FilesDropzoneProps> = ({
//   loading,
//   onDrop,
//   files,
//   filesPreviews,
//   filesSetter = null,
//   dropzonePlaceholder = "Documentation",
//   acceptFileTypes = "image/png,image/jpg,image/jpeg,application/pdf,application/txt",
// }) => {
//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     isDragAccept,
//     isDragReject,
//   } = useDropzone({
//     onDrop,
//     multiple: false,
//     accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [], 'application/pdf': [], 'application/txt': [] },
//   })

//   const style = useMemo(
//     () => ({
//       ...baseStyle,
//       ...(isDragActive ? activeStyle : {}),
//       ...(isDragAccept ? acceptStyle : {}),
//       ...(isDragReject ? rejectStyle : {}),
//     }),
//     [isDragActive, isDragReject, isDragAccept]
//   )

//   const handleFileRemove = async (fileId: string) => {
//     if (filesSetter) {
//       filesSetter(files.filter((f) => (f as any).id !== fileId))
//     }
//     await removeAttachment({ fileId })
//   }

//   const thumbs = filesPreviews?.map((file) => (
//     <div key={file.id}>
//       <div key={`material-${file.id}`}>
//         <div>
//           <a href={file.preview} target="_blank" rel="noreferrer">
//             <img
//               src={
//                 file?.mime?.startsWith("image")
//                   ? file.preview
//                   : `${baseUrl}/attachment_white.svg`
//               }
//               alt="attachment Image"
//               className="object-contain w-20 h-20 centerImage"
//             />
//             <span className="px-3 py-1 bg-white bg-opacity-50 rounded-lg">
//               {String(file.name)}
//             </span>
//           </a>
//           <button
//             style={removeImageButton}
//             type="button"
//             onClick={() => handleFileRemove(file.id)}
//           >
//             <span>Remove</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   ))

//   return (
//     <div>
//       <div {...getRootProps({ style })}>
//         <input {...getInputProps()} />
//         <img
//           src={`${baseUrl}/modal_attachment_white.svg`}
//           alt="attachment"
//           width={30}
//           height={30}
//           className="mr-1"
//           style={{ fill: '#fff' }}
//         />
//         <span>{dropzonePlaceholder}</span>
//         {loading && <div>Loading... </div>}
//       </div>
//       <aside style={thumbsContainer}>{thumbs}</aside>
//     </div>
//   )
// }

// export default FilesDropzone
"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@acme/ui/button";
import { cn } from "@acme/ui";
import { Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface FileDropzoneProps {
  onFilesAdded: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  className?: string;
}

export function FileDropzone({
  onFilesAdded,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    "application/pdf": [".pdf"],
  },
  className,
}: FileDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesAdded(newFiles);
    },
    [files, maxFiles, onFilesAdded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: maxFiles - files.length,
    maxSize,
    accept,
  });

  const removeFile = (fileToRemove: File) => {
    const newFiles = files.filter((file) => file !== fileToRemove);
    setFiles(newFiles);
    onFilesAdded(newFiles);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary",
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag 'n' drop some files here, or click to select files
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {`Up to ${maxFiles} files, max ${maxSize / (1024 * 1024)}MB each`}
        </p>
      </div>
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex items-center justify-between rounded-md bg-gray-100 p-2"
            >
              <span className="truncate text-sm">{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(file)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}