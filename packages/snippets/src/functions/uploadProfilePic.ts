import { api } from "../api/api";
import uploadImage from "./uploadImage";

interface UploadProfilePicProps {
  profileId: number;
  profilePic: File;
}

const uploadProfilePic = async ({
  profileId,
  profilePic,
}: UploadProfilePicProps): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Upload the profile picture
    const imageUpload = await uploadImage(profilePic);

    // Ensure the image upload response contains the expected data
    if (imageUpload && "data" in imageUpload && imageUpload.data.length > 0) {
      // Update the profile with the new profile picture ID
      await api.PUT(`/profiles/${profileId}`, {
        profilePic: imageUpload.data[0].id,
      });
    } else {
      throw new Error("Image upload failed or invalid response data");
    }
  } catch (err) {
    console.error("Error uploading profile picture:", err);
  }
};

export default uploadProfilePic;
