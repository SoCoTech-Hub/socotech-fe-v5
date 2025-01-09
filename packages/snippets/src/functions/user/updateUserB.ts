import { api } from "../../api/api";

interface UpdateUserBParams {
  profileId: string;
  addressId?: string;
  province: string;
  country?: number; // Default is 1
  addressLine1: string;
  addressLine2?: string;
  town: string;
  postalCode?: string; // Default is "0000"
  mobileNr: string;
}

export default async function updateUserB({
  profileId,
  addressId,
  province,
  country = 1,
  addressLine1,
  addressLine2,
  town,
  postalCode = "0000",
  mobileNr,
}: UpdateUserBParams): Promise<void> {
  // Prevent function from being run on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    if (addressId) {
      // Update existing address
      await api.PUT(`/addresses/${addressId}`, {
        province,
        country,
        addressLine1,
        addressLine2,
        town,
        postalCode,
        contactNr: mobileNr,
        profile: { id: profileId },
      });

      // Update the profile's mobile number
      await api.PUT(`/profiles/${profileId}`, {
        mobileNr,
      });
    } else {
      // Create a new address
      await api.POST(`/addresses/`, {
        province,
        country,
        addressLine1,
        addressLine2,
        town,
        postalCode,
        contactNr: mobileNr,
        profile: { id: profileId },
      });

      // Update the profile's mobile number
      await api.PUT(`/profiles/${profileId}`, {
        mobileNr,
      });
    }
  } catch (error: any) {
    console.error("An error occurred while updating user information:", error);
    throw error.response || error;
  }
}
