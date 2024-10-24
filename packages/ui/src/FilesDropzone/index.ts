import React, { useMemo } from "react"
import { useDropzone } from "react-dropzone"
import {
  baseStyle,
  thumbsContainer,
  removeImageButton,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "./styles"
import removeAttachment from "@/snippets/removeAttachment"
import { baseUrl } from "@/context/constants"

interface FilePreview {
  id: string
  preview: string
  name: string
  mime?: string
}

interface FilesDropzoneProps {
  loading?: boolean
  onDrop: (acceptedFiles: File[]) => void
  files: File[]
  filesPreviews?: FilePreview[]
  filesSetter?: (files: File[]) => void
  dropzonePlaceholder?: string
  acceptFileTypes?: string
}

const FilesDropzone: React.FC<FilesDropzoneProps> = ({
  loading,
  onDrop,
  files,
  filesPreviews,
  filesSetter = null,
  dropzonePlaceholder = "Documentation",
  acceptFileTypes = "image/png,image/jpg,image/jpeg,application/pdf,application/txt",
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [], 'application/pdf': [], 'application/txt': [] },
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  const handleFileRemove = async (fileId: string) => {
    if (filesSetter) {
      filesSetter(files.filter((f) => (f as any).id !== fileId))
    }
    await removeAttachment({ fileId })
  }

  const thumbs = filesPreviews?.map((file) => (
    <div key={file.id}>
      <div key={`material-${file.id}`}>
        <div>
          <a href={file.preview} target="_blank" rel="noreferrer">
            <img
              src={
                file?.mime?.startsWith("image")
                  ? file.preview
                  : `${baseUrl}/attachment_white.svg`
              }
              alt="attachment Image"
              className="object-contain w-20 h-20 centerImage"
            />
            <span className="px-3 py-1 bg-white bg-opacity-50 rounded-lg">
              {String(file.name)}
            </span>
          </a>
          <button
            style={removeImageButton}
            type="button"
            onClick={() => handleFileRemove(file.id)}
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  ))

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <img
          src={`${baseUrl}/modal_attachment_white.svg`}
          alt="attachment"
          width={30}
          height={30}
          className="mr-1"
          style={{ fill: '#fff' }}
        />
        <span>{dropzonePlaceholder}</span>
        {loading && <div>Loading... </div>}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  )
}

export default FilesDropzone
