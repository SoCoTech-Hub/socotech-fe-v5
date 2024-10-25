import React, { useMemo } from "react";
import { baseUrl } from "@/context/constants";
import removeAttachment from "@/snippets/removeAttachment";
import { useDropzone } from "react-dropzone";

import {
  acceptStyle,
  activeStyle,
  baseStyle,
  rejectStyle,
  removeImageButton,
  thumbsContainer,
} from "./styles";

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
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const handleFileRemove = async (fileId) => {
    if (filesSetter) {
      filesSetter(files.filter((f) => f.id !== fileId));
    }
    await removeAttachment({ fileId: fileId });
  };

  const thumbs = filesPreviews?.map((file) => (
    <div key={file.id} className="">
      <div key={`material-${file.id}`}>
        <div className="">
          <a href={file.preview} target="_blank" rel="noreferrer">
            <img
              src={
                file?.mime?.startsWith("image")
                  ? file.preview
                  : `${baseUrl}/attachment_white.svg`
              }
              alt="attachment Image"
              className="centerImage h-20 w-20 object-contain"
            />
            <span className="rounded-lg bg-white bg-opacity-50 px-3 py-1">
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
  ));

  return (
    <div className="">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <img
          src={`${baseUrl}/modal_attachment_white.svg`}
          alt="attachment"
          width={30}
          height={30}
          className="mr-1"
          style={{ fill: "#fff" }}
        />
        <span>{dropzonePlaceholder}</span>
        {loading && <div>Loading... </div>}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  );
};

export default FilesDropzone;
