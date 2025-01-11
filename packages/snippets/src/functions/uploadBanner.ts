import { api } from "../api/api";
import uploadImage from "./uploadImage";

const uploadBanner = async ({
  profileId,
  banner,
}: {
  profileId: number;
  banner: File;
}): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Upload the banner image
    const imageUpload = await uploadImage(banner);

    // Update the profile with the new banner ID
    if ("data" in imageUpload) {
      await api.PUT(`/profiles/${profileId}`, {
        banner: imageUpload.data[0]?.id,
      });
    } else {
      throw new Error("Image upload failed");
    }
  } catch (err) {
    console.error("Error uploading banner:", err);
  }
};

export default uploadBanner;
