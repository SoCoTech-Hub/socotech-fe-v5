import { api } from "../../api/api";
import { profileId } from "../../context/constants";

interface UpdateUserDeviceParams {
  serialNumber?: string;
  imei?: string;
}

const updateUserDevice = async ({
  serialNumber,
  imei,
}: UpdateUserDeviceParams): Promise<void> => {
  if (typeof window === "undefined") {
    console.warn("This function cannot be executed on the server.");
    return;
  }

  try {
    // Update the user's device information
    await api.PUT(`/profiles/${profileId}`, {
      ...(serialNumber && { serialNumber }),
      ...(imei && { imei }),
    });

    console.log("User device information updated successfully.");
  } catch (error: any) {
    console.error("Error updating user device information:", error);
    throw error;
  }
};

export default updateUserDevice;
