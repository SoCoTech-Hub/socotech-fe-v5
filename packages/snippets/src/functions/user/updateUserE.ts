import { api } from "../../api/api";

interface UpdateUserEParams {
  parentId?: string;
  profileId: string;
  firstName: string;
  lastName: string;
  mobileNr: string;
  email: string;
  userRelation: string;
}

export default async function updateUserE({
  parentId,
  profileId,
  firstName,
  lastName,
  mobileNr,
  email,
  userRelation,
}: UpdateUserEParams): Promise<void> {
  const data = {
    profiles: { id: profileId },
    firstName,
    lastName,
    mobileNr,
    email,
    userRelation: { id: userRelation },
  };

  try {
    if (!parentId) {
      // Create a new parent record
      await api.POST("/parents", data);
    } else {
      // Update an existing parent record
      await api.PUT(`/parents/${parentId}`, data);
    }
  } catch (error: any) {
    console.error(
      "An error occurred while updating the user information:",
      error,
    );
    throw error.response || error;
  }
}
