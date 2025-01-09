import { api } from "../../api/api";

interface UpdateUserAParams {
  profile: string;
  dob?: string; // Assuming the date of birth is a string (ISO format or similar)
  mobileNr?: string;
  gender?: string;
}

export default async function updateUserA({
  profile,
  dob,
  mobileNr,
  gender,
}: UpdateUserAParams): Promise<void> {
  // Prevent function from being run on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    await api.PUT(`/profiles/${profile}`, {
      dob,
      mobileNr,
      gender,
    });
  } catch (error: any) {
    console.error("An error occurred while updating the user profile:", error);
    throw error.response || error;
  }
}
