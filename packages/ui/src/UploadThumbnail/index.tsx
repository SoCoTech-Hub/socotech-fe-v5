import { FC } from "react";



import { Button } from "../button";


interface File {
  id: string;
  url: string;
  mime?: string;
  preview?: string;
  name?: string;
}

export interface UploadThumbnailProps {
  files: File[];
  handleFileRemove?: (id: string) => void;
}

export const UploadThumbnail: FC<UploadThumbnailProps> = ({
  files,
  handleFileRemove,
}) => {
  return files && files.length > 0 ? (
    <>
      {files.map((file, i) => (
        <div key={i} className="">
          <div className="">
            <a href={file?.url} target="_blank" rel="noreferrer">
              <img
                src={
                  file?.mime?.startsWith("image")
                    ? file?.preview || file.url
                    : ``
                }
                alt="attachment"
                className="object-contain w-20 h-20 centerImage"
              />
              {file.name && (
                <span
                  className="px-3 py-1 bg-blue-100 bg-opacity-50 rounded-lg"
                  style={{ color: "#0099FF" }}
                >
                  {file.name.substring(0, 10) + "..."}
                </span>
              )}
            </a>
            {handleFileRemove && (
              <Button type="button" onClick={() => handleFileRemove(file.id)}>
                <span>Remove</span>
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  ) : (
    <></>
  );
};