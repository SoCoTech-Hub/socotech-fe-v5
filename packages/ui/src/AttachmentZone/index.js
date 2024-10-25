import { useMemo } from "react";
import Image from "next/image";
import CircleLoader from "@/components/CircleLoader";
import { baseUrl } from "@/context/constants";
import removeAttachment from "@/snippets/removeAttachment";
import { useDropzone } from "react-dropzone";

import { thumbsContainer } from "./styles";

const picturesPrefix = `${process.env.NEXT_PUBLIC_API_URL}`;

const AttachmentZone = ({
  loading,
  onDrop,
  files,
  filesPreviews,
  filesSetter = null,
  dropzonePlaceholder = "Documentation",
  acceptFileTypes = "image/png,image/jpg,image/jpeg,application/pdf",
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

  const thumbs = filesPreviews.length ? (
    filesPreviews.map((file) => (
      <div key={file.id} className="">
        <div key={`material-${file.id}`}>
          <div className="mx-3 flex">
            <span className="text-textColor rounded-full bg-blue-600 pl-3">
              <a
                href={`${picturesPrefix}${file.preview}`}
                target="_blank"
                rel="noreferrer"
              >
                {String(file.name)}
              </a>
              <button
                className="bg-themeColorMain ml-2 rounded-full px-3 py-2 font-bold text-black"
                type="button"
                onClick={() => handleFileRemove(file.id)}
              >
                <span>X</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-textColor">{dropzonePlaceholder}</div>
  );

  return (
    <div {...getRootProps({ style })}>
      <div className="bg-compBg mt-3 flex items-center rounded-lg py-1 pl-2 align-middle">
        <div className="mr-3 h-8 w-8">
          <input {...getInputProps()} />
          <Image
            src={`${baseUrl}/modal_attachment.svg`}
            alt="Attachment"
            width={150}
            height={150}
          />
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </div>
      {loading && <CircleLoader />}
    </div>
  );
};

export default AttachmentZone;
