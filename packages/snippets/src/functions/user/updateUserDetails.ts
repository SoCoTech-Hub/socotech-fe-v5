import { api } from "../../api/api";
import { CreateAllCookies } from "../../cookies/createAllCookies";

interface UpdateUserDetailsParams {
  profileID: string;
  userInput: {
    dob?: string;
    firstName: string;
    lastName: string;
    mobileNr?: string;
  };
  grade?: string;
  school?: string;
  location?: string;
  gender?: string;
}

export default async function updateUserDetails({
  profileID,
  userInput,
  grade,
  school,
  location,
  gender,
}: UpdateUserDetailsParams): Promise<void> {
  // Prevent function from being run on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    const { data } = await api.PUT(`/profiles/${profileID}`, {
      dob: userInput.dob,
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      mobileNr: userInput.mobileNr,
      gender: gender ? { id: gender } : null,
      grades: grade ? { id: grade } : null,
      provinces: location ? { id: location } : null,
      schools: school ? { id: school } : null,
    });

    if (!data) {
      throw new Error("An error occurred while updating the profile");
    }

    const cookieData = {
      days: 31,
      firstName: data.firstName,
      lastName: data.lastName,
      grades: data.grades,
      provinces: data.provinces,
      schools: data.schools,
      subjects: data.subjects,
      profilePicUrl: data.profilePic?.url,
      profileBannerUrl: data.banner?.url,
      uniqueId: data.uniqueId,
    };

    CreateAllCookies(cookieData);
  } catch (error: any) {
    console.error("An error occurred during user profile update:", error);
    throw error.response || error;
  }
}
