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

// const picturesPrefix = `${process.env.NEXT_PUBLIC_MAIN_URL}`

const FilesDropzone = ({
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
    accept: acceptFileTypes,
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

  const handleFileRemove = async (fileId) => {
    if (filesSetter) {
      filesSetter(files.filter((f) => f.id !== fileId))
    }
    await removeAttachment({ fileId: fileId })
  }

  const thumbs = filesPreviews?.map((file) => (
    <div key={file.id} className=''>
      <div key={`material-${file.id}`}>
        <div className=''>
          <a href={file.preview} target='_blank' rel='noreferrer'>
            <img
              src={
                file?.mime?.startsWith("image")
                  ? file.preview
                  : `${baseUrl}/attachment.svg`
              }
              alt='attachment Image'
              className='object-contain w-20 h-20 centerImage'
            />
            <span
              className='px-3 py-1 bg-blue-100 bg-opacity-50 rounded-lg'
              style={{ color: "#0099FF" }}
            >
              {String(file.name)}
            </span>
          </a>
          <button
            style={removeImageButton}
            type='button'
            onClick={() => handleFileRemove(file.id)}
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  ))

  return (
    <div className=''>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <img
          src={`${baseUrl}/modal_attachment.svg`}
          alt='attachment'
          width={50}
          height={50}
          className='mr-1'
        />
        <span>{dropzonePlaceholder}</span>
        {loading && <div>Loading... </div>}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  )
}

export default FilesDropzone
