import { api } from "../../api/api";
import { profileId } from "../../context/constants";

interface UpdateUserAboutParams {
  about: string;
}

const updateUserAbout = async ({
  about,
}: UpdateUserAboutParams): Promise<void> => {
  if (typeof window === "undefined") {
    console.warn("This function cannot be executed on the server.");
    return;
  }

  try {
    await api.PUT(`/profiles/${profileId}`, { about });
    console.log("User 'about' section updated successfully.");
  } catch (error: any) {
    console.error("Error updating user 'about' section:", error);
    throw error;
  }
};

export default updateUserAbout;
