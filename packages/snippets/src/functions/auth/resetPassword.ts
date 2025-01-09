import { api } from "../../api/api";

interface ResetPasswordParams {
  code: string;
  password: string;
}

export default async function resetPassword({
  code,
  password,
}: ResetPasswordParams): Promise<any> {
  // Prevent function from being run on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    // TODO: Check if the endpoint is still valid
    const response = await api.POST("/auth/reset-password", {
      code,
      password,
      passwordConfirmation: password,
    });
    return response;
  } catch (error: any) {
    console.error("An error occurred during password reset:", error);
    throw error.response || error;
  }
}
