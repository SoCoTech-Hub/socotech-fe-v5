import { api } from "../api/api";

interface RemoveAttachmentProps {
  fileId: string | number;
}

const removeAttachment = async ({
  fileId,
}: RemoveAttachmentProps): Promise<any> => {
  if (!fileId) {
    console.error("File ID is required to remove an attachment.");
    return;
  }

  try {
    const response = await api.DELETE(`/upload/files/${fileId}`);
    return response;
  } catch (error: any) {
    console.error("Error removing attachment:", error.response || error);
    throw error;
  }
};

export default removeAttachment;
