import { api } from "../../api/api";
import { profileId } from "../../context/constants";

interface UpdateUserAddressParams {
  addressId?: string;
  addressLine1: string;
  addressLine2?: string;
  addProvince: string;
  town: string;
  contactNr: string;
}

const updateUserAddress = async ({
  addressId,
  addressLine1,
  addressLine2,
  addProvince,
  town,
  contactNr,
}: UpdateUserAddressParams): Promise<void> => {
  if (typeof window === "undefined") {
    console.warn("This function cannot be executed on the server.");
    return;
  }

  try {
    if (addressId) {
      // Update existing address
      await api.PUT(`/addresses/${addressId}`, {
        addressLine1,
        addressLine2,
        province: { id: addProvince },
        town,
        contactNr,
        profile: { id: profileId, mobileNr: contactNr },
      });

      // Update profile's mobile number
      await api.PUT(`/profiles/${profileId}`, {
        mobileNr: contactNr,
      });
    } else {
      // Create a new address and link it to the profile
      const response = await api.POST(`/addresses`, {
        addressLine1,
        addressLine2,
        province: { id: addProvince },
        town,
        contactNr,
        profile: { id: profileId, mobileNr: contactNr },
      });

      // Update profile with the new address and mobile number
      await api.PUT(`/profiles/${profileId}`, {
        mobileNr: contactNr,
        addresses: response.data.addresses,
      });
    }

    console.log("Address successfully updated/added.");
  } catch (error: any) {
    console.error("Error updating/adding address:", error);
    throw error;
  }
};

export default updateUserAddress;
