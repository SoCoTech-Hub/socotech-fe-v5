// import { useMemo } from 'react';
// import { useDropzone } from 'react-dropzone';
// import Image from 'next/image';
// import { thumbsContainer } from './styles';
// import CircleLoader from '@/components/CircleLoader';
// import { baseUrl } from '@/context/constants';
// import removeAttachment from '@/snippets/removeAttachment';

// const picturesPrefix = `${process.env.NEXT_PUBLIC_API_URL}`;

// interface FilePreview {
//   id: string;
//   preview: string;
//   name: string;
// }

// interface AttachmentZoneProps {
//   loading: boolean;
//   onDrop: (acceptedFiles: File[]) => void;
//   files: FilePreview[];
//   filesPreviews: FilePreview[];
//   filesSetter?: (files: FilePreview[]) => void;
//   dropzonePlaceholder?: string;
//   acceptFileTypes?: string;
// }

// const AttachmentZone: React.FC<AttachmentZoneProps> = ({
//   loading,
//   onDrop,
//   files,
//   filesPreviews,
//   filesSetter = null,
//   dropzonePlaceholder = 'Documentation',
//   acceptFileTypes = 'image/png,image/jpg,image/jpeg,application/pdf',
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
//     accept: acceptFileTypes,
//   });

//   const activeStyle = {}; // Define your active style
//   const acceptStyle = {}; // Define your accept style
//   const rejectStyle = {}; // Define your reject style

//   const style = useMemo(
//     () => ({
//       ...(isDragActive ? activeStyle : {}),
//       ...(isDragAccept ? acceptStyle : {}),
//       ...(isDragReject ? rejectStyle : {}),
//     }),
//     [isDragActive, isDragReject, isDragAccept]
//   );

//   const handleFileRemove = async (fileId: string) => {
//     if (filesSetter) {
//       filesSetter(files.filter((f) => f.id !== fileId));
//     }
//     await removeAttachment({ fileId });
//   };

//   const thumbs = filesPreviews.length ? (
//     filesPreviews.map((file) => (
//       <div key={file.id} className=''>
//         <div key={`material-${file.id}`}>
//           <div className='flex mx-3'>
//             <span className='pl-3 bg-blue-600 rounded-full text-textColor'>
//               <a
//                 href={`${picturesPrefix}${file.preview}`}
//                 target='_blank'
//                 rel='noreferrer'
//               >
//                 {String(file.name)}
//               </a>
//               <button
//                 className='px-3 py-2 ml-2 font-bold text-black rounded-full bg-themeColorMain'
//                 type='button'
//                 onClick={() => handleFileRemove(file.id)}
//               >
//                 <span>X</span>
//               </button>
//             </span>
//           </div>
//         </div>
//       </div>
//     ))
//   ) : (
//     <div className='text-textColor'>{dropzonePlaceholder}</div>
//   );

//   return (
//     <div {...getRootProps({ style })}>
//       <div className='flex items-center py-1 pl-2 mt-3 align-middle rounded-lg bg-compBg'>
//         <div className='w-8 h-8 mr-3'>
//           <input {...getInputProps()} />
//           <Image
//             src={`${baseUrl}/modal_attachment.svg`}
//             alt='Attachment'
//             width={150}
//             height={150}
//           />
//         </div>
//         <aside style={thumbsContainer}>{thumbs}</aside>
//       </div>
//       {loading && <CircleLoader />}
//     </div>
//   );
// };

// export default AttachmentZone;
"use client";

import * as React from "react";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { cn } from "../";
import { useToast } from "../hooks/use-toast";

interface DropzoneProps {
  maxSize?: number;
  acceptedFileTypes?: string[];
  uploadUrl: string;
}

export function Dropzone({
  maxSize = 5242880,
  acceptedFileTypes = ["image/*", "application/pdf"],
  uploadUrl,
}: DropzoneProps) {
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadStatus, setUploadStatus] = React.useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const { toast } = useToast();

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setUploadStatus("uploading");
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          setUploadStatus("success");
          toast({
            title: "File uploaded successfully",
            description: `${file.name} has been uploaded.`,
          });
        } catch (error) {
          setUploadStatus("error");
          toast({
            title: "Upload failed",
            description:
              "There was an error uploading your file. Please try again.",
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

  React.useEffect(() => {
    if (uploadStatus === "uploading") {
      const timer = setInterval(() => {
        setUploadProgress((oldProgress) => {
          const newProgress = oldProgress + 10;
          if (newProgress === 100) {
            clearInterval(timer);
          }
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 500);
      return () => clearInterval(timer);
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
    >
      <input {...getInputProps()} />
      {uploadStatus === "idle" && (
        <>
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="mb-1 text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-muted-foreground/75">
            {acceptedFileTypes.join(", ")} (max. {Math.round(maxSize / 1048576)}
            MB)
          </p>
        </>
      )}
      {uploadStatus === "uploading" && (
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
      )}
      {uploadStatus === "success" && (
        <div className="flex flex-col items-center">
          <CheckCircle className="mb-2 h-12 w-12 text-green-500" />
          <p className="text-sm text-muted-foreground">Upload successful!</p>
        </div>
      )}
      {uploadStatus === "error" && (
        <div className="flex flex-col items-center">
          <AlertCircle className="mb-2 h-12 w-12 text-destructive" />
          <p className="text-sm text-muted-foreground">
            Upload failed. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}

// USE:
/*
'use client'

import { Dropzone } from '@acme/ui/dropzone'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@acme/ui/card'
import { Toast } from "../toast"

export default function DropzoneExample() {
  return (
    <div className="max-w-md p-4 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>Drag and drop your file here or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <Dropzone uploadUrl="/api/upload" />
        </CardContent>
      </Card>
      <Toast />
    </div>
  )
}
*/
