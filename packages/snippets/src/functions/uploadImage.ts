import { api } from "../api/api";

export interface UploadImageResponse {
  data: {
    id: number;
    url: string;
    [key: string]: any;
  }[];
  [key: string]: any;
}

const uploadImage = async (
  image: File,
): Promise<UploadImageResponse | Error> => {
  const formData = new FormData();
  formData.append("files", image);

  try {
    const response = await api.POST(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    console.error("Error uploading image:", err);
    return err as Error;
  }
};

export default uploadImage;
