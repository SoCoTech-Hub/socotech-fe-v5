import { api } from "../../api/api";
import { profileId } from "../../context/constants";

interface UpdateUserKinParams {
  parent?: string; // ID of the parent to update (optional)
  parentFirstName: string;
  parentLastName: string;
  userRelation: string;
  parentMobileNr: string;
}

const updateUserKin = async ({
  parent,
  parentFirstName,
  parentLastName,
  userRelation,
  parentMobileNr,
}: UpdateUserKinParams): Promise<void> => {
  if (typeof window === "undefined") {
    console.warn("This function cannot be executed on the server.");
    return;
  }

  const data = {
    firstName: parentFirstName,
    lastName: parentLastName,
    userRelation,
    mobileNr: parentMobileNr,
    profiles: [{ id: profileId }],
  };

  try {
    if (parent) {
      // Update an existing parent record
      await api.PUT(`/parents/${parent}`, data);
      console.log(`Parent with ID ${parent} updated successfully.`);
    } else {
      // Create a new parent record
      await api.POST(`/parents`, data);
      console.log("New parent record created successfully.");
    }
  } catch (error: any) {
    console.error("Error updating or creating parent record:", error);
    throw error;
  }
};

export default updateUserKin;
