import { api } from "../../api/api";

interface ResendConfirmationParams {
  email: string;
}

export default async function resendConfirmation({
  email,
}: ResendConfirmationParams): Promise<any> {
  // Prevent function from running on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    //TODO: Check if this endpoint is still valid
    const response = await api.POST("/auth/send-email-confirmation", {
      email: email.trim(),
    });
    return response;
  } catch (error: any) {
    console.error(
      "An error occurred while resending confirmation email:",
      error,
    );
    return error.response || error;
  }
}
