import { api } from "../../api/api";

interface UpdateUserDParams {
  profile: string;
  serialNumber?: string;
  imei?: string;
}

export default async function updateUserD({
  profile,
  serialNumber,
  imei,
}: UpdateUserDParams): Promise<void> {
  // Prevent function from being run on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    await api.PUT(`/profiles/${profile}`, {
      serialNumber,
      imei,
    });
  } catch (error: any) {
    console.error("An error occurred while updating the user profile:", error);
    throw error.response || error;
  }
}
