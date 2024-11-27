interface UploadParams {
  profileId: string;
  file: File;
  uploadType: "profilePic" | "banner";
}

export const uploadImage = async ({
  profileId,
  file,
  uploadType,
}: UploadParams): Promise<object> => {
  // Simulate a delay for the upload
  const res = new Promise((resolve, reject) => {
    //TODO: Upload banner and profilePic based on uploadType
    setTimeout(() => {
      // Simulate a successful upload 90% of the time
      Math.random() > 0.1 ? resolve() : reject(new Error("Upload failed"));
    }, 1500);
  });
  return res;
};
