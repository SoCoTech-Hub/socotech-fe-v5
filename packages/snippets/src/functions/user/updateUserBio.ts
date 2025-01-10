import { api } from "../../api/api";
import { CreateAllCookies } from "../../cookies/createAllCookies";

interface UpdateUserAboutParams {
  profileId: string;
  firstName: string;
  lastName: string;
  dob: string; // ISO 8601 format (e.g., "2025-01-10")
  idNumber?: string;
  gender?: string;
}

const updateUserAbout = async ({
  profileId,
  firstName,
  lastName,
  dob,
  idNumber,
  gender,
}: UpdateUserAboutParams): Promise<void> => {
  if (typeof window === "undefined") {
    console.warn("This function cannot be executed on the server.");
    return;
  }

  try {
    // Update user profile details
    await api.PUT(`/profiles/${profileId}`, {
      firstName,
      lastName,
      dob,
      idNumber,
      gender,
    });

    // Update relevant cookies
    CreateAllCookies({
      firstName,
      lastName,
      days: 14,
    });

    console.log("User details updated successfully.");
  } catch (error: any) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

export default updateUserAbout;
