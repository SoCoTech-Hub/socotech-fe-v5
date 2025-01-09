import { api } from "../../api/api";
import { CreateAllCookies } from "../../cookies/createAllCookies";
import generateUniqueId from "../generateUniqueId";

interface RegisterUser2Params {
  email: string;
  password: string;
  organization?: {
    id: number;
    name?: string;
  };
}

export default async function RegisterUser2({
  email,
  password,
  organization,
}: RegisterUser2Params): Promise<any> {
  // Prevent function from being run on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    // Create the profile
    const profileResponse = await api.POST("/profiles", {
      organization: { id: organization?.id || 1 },
    });

    const profile = profileResponse.data;

    // Register the user
    const registerResponse = await api.POST("/auth/local/register", {
      username: email.trim(),
      email: email.trim(),
      password,
      profile: { id: profile.id },
      blocked: false,
    });

    if (!registerResponse) {
      return registerResponse;
    }

    const userData = registerResponse.data;

    // Generate a unique ID
    const uniqueId = generateUniqueId({
      organization: profile.organization,
      userid: userData.user.id,
    });

    // Update the profile with the unique ID
    const profileUpdateResponse = await api.PUT(
      `/profiles/${userData.user.profile.id}`,
      {
        uniqueId,
      },
    );

    if (!profileUpdateResponse) {
      return profileUpdateResponse;
    }

    // Set cookies
    CreateAllCookies({
      days: 14,
      rememberMe: true,
      email,
    });

    return profileUpdateResponse;
  } catch (error: any) {
    console.error("An error occurred during user registration:", error);
    return error.response || error;
  }
}
